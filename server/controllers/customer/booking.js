import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import Booking from "../../models/bookingModel.js";
import Motobike from "../../models/motobikeModel.js";
import User from '../../models/userModel.js'
import MotobikeType from '../../models/motobikeTypeModel.js'
import PayOS from "@payos/node";

dayjs.extend(utc);
dayjs.extend(timezone);

// book : 
export const bookMotobike = async (req, res) => {
    try {
        // Only customers are allowed to book
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: true, message: 'Only customers can book!' });
        }

        // Extract customerId from req.user
        const customerId = req.user.userId;
        const {
            ownerId,
            motobike,
            totalPrice,
            bookedDate,
            amountMotobike,
            pickUpLocation,
            dropOffLocation,
        } = req.body; // Extract data from the request body

        // Validate fields
        if (!customerId) return res.status(400).json({ success: false, error: "Customer ID is required" });
        if (!ownerId) return res.status(400).json({ success: false, error: "Owner ID is required" });
        if (!motobike || !Array.isArray(motobike) || motobike.length === 0) {
            return res.status(400).json({ success: false, message: "Motobike ID is required" });
        }
        if (!totalPrice) return res.status(400).json({ success: false, error: "Total price is required" });
        if (!bookedDate || !Array.isArray(bookedDate) || bookedDate.length === 0) {
            return res.status(400).json({ success: false, error: "Booked dates must be an array and cannot be empty" });
        }
        if (!amountMotobike) return res.status(400).json({ success: false, error: "Amount of motobikes is required" });
        if (!pickUpLocation) return res.status(400).json({ success: false, error: "Pick-up location is required" });
        if (!dropOffLocation) return res.status(400).json({ success: false, error: "Drop-off location is required" });

        // Validate totalPrice and amountMotobike
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ success: false, error: "Total price must be a positive number" });
        }
        if (typeof amountMotobike !== "number" || amountMotobike < 1) {
            return res.status(400).json({ success: false, error: "Amount of motobikes must be at least 1" });
        }

        // Validate and normalize bookedDate array
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = bookedDate.map(date => {
            if (isNaN(new Date(date).getTime())) {
                throw new Error(`Invalid date format: ${date}`);
            }
            return dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate(); // Normalize to UTC
        });

        // Create a new booking
        const newBooking = new Booking({
            customerId,
            ownerId,
            motobike,
            totalPrice,
            bookedDate: normalizedDates, // Use normalized UTC dates
            amountMotobike,
            pickUpLocation,
            dropOffLocation,
            status: "renting", // Default status
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();
        // Update the bookedDate field for each motobike in the list
        await Promise.all(
            motobike.map(motobikeId =>
                Motobike.findByIdAndUpdate(
                    motobikeId, // Find motobike by its ID
                    { $push: { bookedDate: { $each: normalizedDates } } }, // Add the dates to the bookedDate array
                    { new: true } // Return the updated motobike document
                )
            )
        );
        // Respond with the saved booking
        return res.status(201).json({ success: true, data: savedBooking });
    } catch (error) {
        console.error("Error booking motobike:", error.message);
        return res.status(500).json({ success: false, error: error.message }); // Return error details
    }
};

// get motobikename from id : 
const getMotobikeTypeName = async (motobikeId) => {
  try {
    const motobike = await Motobike.findById(motobikeId)
      .populate('motobikeType', 'name') // only populate the `name` field from MotobikeType
      .exec();

    if (!motobike) {
      console.log('Motobike not found');
      return null;
    }

    const motobikeTypeName = motobike.motobikeType?.name;
    console.log('Motobike type name:', motobikeTypeName);
    return motobikeTypeName;
  } catch (err) {
    console.error('Error fetching motobike type name:', err);
    throw err;
  }
};

// get all booking of : customer || owner || admin : 
export const getAllBookings = async (req, res) => {
    try {
        const { userId } = req.user;

        // Fetch user to determine role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let bookings;

        // Fetch bookings based on role
        if (user.role === 'customer') {
            bookings = await Booking.find({ customerId: userId }).populate('motobike').populate('customerId').populate('ownerId').sort({ createdAt: -1 });
        } else if (user.role === 'owner') {
            bookings = await Booking.find({ ownerId: userId }).populate('motobike').populate('customerId').populate('ownerId').sort({ createdAt: -1 });
        } else if (user.role === 'admin') {
            bookings = await Booking.find().populate('motobike').populate('customerId').populate('ownerId').sort({ createdAt: -1 });
        } else {
            return res.status(400).json({ message: 'Invalid user role' });
        }

        // Format the response
        const formattedBookings = await Promise.all(bookings.map(async (booking) => {
            const motobikeNames = await Promise.all(
                booking.motobike.map(async (motobikeId) => {
                    const motobikeType = await MotobikeType.findById(motobikeId.motobikeType);
                    return motobikeType ? motobikeType.name : 'Unknown';
                })
            );

            return {
                customerName: booking.customerId.fullName || booking.customerId.email,
                ownerName: booking.ownerId.fullName || booking.ownerId.email,
                motobikeName: motobikeNames.join(', '),
                date: booking.bookedDate.map(date => date.toISOString().split('T')[0]).join(', '),
                total: booking.totalPrice,
                amount: booking.amountMotobike,
                pickup: booking.pickUpLocation,
                dropoff: booking.dropOffLocation,
                status: booking.status,
                ownerId: booking.ownerId._id,
                customerId: booking.customerId._id,
            };
        }));

        // Respond with the formatted data
        return res.status(200).json(formattedBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const bookingUsePayosGateway = async (req, res) => {
    try {
        // get request body :
        // Only customers are allowed to book
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: true, message: 'Only customers can book!' });
        }
        // Extract customerId from req.user
        const customerId = req.user.userId;
        const {
            ownerId,
            motobike,
            totalPrice,
            bookedDate,
            amountMotobike,
            pickUpLocation,
            dropOffLocation,
        } = req.body; // Extract data from the request body

        console.log("booked Date : ", bookedDate);

        // Validate fields
        if (!customerId) return res.status(400).json({ success: false, error: "Customer ID is required" });
        if (!ownerId) return res.status(400).json({ success: false, error: "Owner ID is required" });
        if (!motobike || !Array.isArray(motobike) || motobike.length === 0) {
            return res.status(400).json({ success: false, message: "Motobike ID is required" });
        }
        if (!totalPrice) return res.status(400).json({ success: false, error: "Total price is required" });
        if (!bookedDate || !Array.isArray(bookedDate) || bookedDate.length === 0) {
            return res.status(400).json({ success: false, error: "Booked dates must be an array and cannot be empty" });
        }
        if (!amountMotobike) return res.status(400).json({ success: false, error: "Amount of motobikes is required" });
        if (!pickUpLocation) return res.status(400).json({ success: false, error: "Pick-up location is required" });
        if (!dropOffLocation) return res.status(400).json({ success: false, error: "Drop-off location is required" });

        // Validate totalPrice and amountMotobike
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ success: false, error: "Total price must be a positive number" });
        }
        if (typeof amountMotobike !== "number" || amountMotobike < 1) {
            return res.status(400).json({ success: false, error: "Amount of motobikes must be at least 1" });
        }

        // Validate and normalize bookedDate array
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = bookedDate.map(date => {
            if (isNaN(new Date(date).getTime())) {
                throw new Error(`Invalid date format: ${date}`);
            }
            return dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate(); // Normalize to UTC
        });
        // create a new instance of PayOS with your credentials : 
        const payOS = new PayOS(
            "3401b9d3-c77c-4ddd-a10c-4f027e711d6b",
            "78c2c7e6-036e-4ec6-b801-4e0739e10b67",
            "a3a30e98bb461cd4f54253c1af405f4317bf29116470cfcabc5ee1016e64f52d"
        );
        // create link payment : 
        const body = {
            // create orderCode less than 100000 
            orderCode: Math.floor(Math.random() * 1_000_000_000),
            amount: totalPrice,
            // amount: 2000,
            description: "Thanh toan don hang",
            items: [
                {
                    name: getMotobikeTypeName(motobike),
                    quantity: amountMotobike,
                    price: totalPrice,
                },
            ],
            cancelUrl: "https://rent-vehicle-project.onrender.com/cancelBooking",
            returnUrl: `https://rent-vehicle-project.onrender.com/successBooking` +
                `?customerId=${customerId}` +
                `&ownerId=${ownerId}` +
                `&totalPrice=${totalPrice}` +
                `&amountMotobike=${amountMotobike}` +
                `&pickUpLocation=${encodeURIComponent(pickUpLocation)}` +
                `&dropOffLocation=${encodeURIComponent(dropOffLocation)}` +
                motobike.map(id => `&motobike=${id}`).join('') +
                bookedDate.map(date => `&bookedDate=${encodeURIComponent(date)}`).join('')
        };

        const paymentLinkRes = await payOS.createPaymentLink(body);
        console.log("Payment link created successfully:", paymentLinkRes.checkoutUrl);
        return res.status(200).json({
            success: true,
            message: "Payment link created successfully",
            paymentLink: paymentLinkRes.checkoutUrl,
        })

    } catch (error) {
        console.error("Error creating payment link:", error.message);
        return res.status(500).json({ success: false, error: error.message }); // Return error details
    }
}

