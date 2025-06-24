import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import MotobikeType from './models/motobikeTypeModel.js';
import StoreLocation from './models/storeLocationModel.js';
import Motobike from './models/motobikeModel.js';
import Addon from './models/addonModel.js';
import Booking from './models/bookingModel.js';
import Feedback from './models/feedbackModel.js';
import Message from './models/messageModel.js';
import Post from './models/postModel.js';
import Discount from './models/discountModel.js';

// MongoDB connection URL - replace with your actual connection string
const MONGODB_URI = 'mongodb://localhost:27017/rent-vehicle';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Sample data
const sampleData = {
    users: [
        {
            fullName: 'Admin User',
            email: 'admin@example.com',
            password: 'Admin@123',
            role: 'admin',
            isVerifyAccount: true,
            authMethod: 'mail',
            phone: '0123456789',
            gender: 'male',
            address: '123 Admin Street',
            commune: 'Ben Nghe',
            district: 'District 1',
            province: 'Ho Chi Minh',
            image: 'https://example.com/admin.jpg',
            identityCard: {
                before: 'https://example.com/admin_id_front.jpg',
                after: 'https://example.com/admin_id_back.jpg'
            },
            driverLicense: {
                before: 'https://example.com/admin_license_front.jpg',
                after: 'https://example.com/admin_license_back.jpg'
            }
        },
        {
            fullName: 'Owner User',
            email: 'owner@example.com',
            password: 'Owner@123',
            role: 'owner',
            isVerifyAccount: true,
            authMethod: 'mail',
            phone: '0987654321',
            gender: 'male',
            address: '456 Owner Street',
            commune: 'Tan Thuan Dong',
            district: 'District 7',
            province: 'Ho Chi Minh',
            image: 'https://example.com/owner.jpg',
            identityCard: {
                before: 'https://example.com/owner_id_front.jpg',
                after: 'https://example.com/owner_id_back.jpg'
            },
            driverLicense: {
                before: 'https://example.com/owner_license_front.jpg',
                after: 'https://example.com/owner_license_back.jpg'
            }
        },
        {
            fullName: 'Customer User',
            email: 'customer@example.com',
            password: 'Customer@123',
            role: 'customer',
            isVerifyAccount: true,
            authMethod: 'mail',
            phone: '0123987654',
            gender: 'female',
            address: '789 Customer Street',
            commune: 'Ben Nghe',
            district: 'District 1',
            province: 'Ho Chi Minh',
            image: 'https://example.com/customer.jpg',
            identityCard: {
                before: 'https://example.com/customer_id_front.jpg',
                after: 'https://example.com/customer_id_back.jpg'
            },
            driverLicense: {
                before: 'https://example.com/customer_license_front.jpg',
                after: 'https://example.com/customer_license_back.jpg'
            }
        }
    ],
    motobikeTypes: [
        {
            name: 'Honda Wave Alpha',
            height: 1100,
            weight: 97,
            image: 'https://example.com/wave-alpha.jpg',
            description: 'Economical and reliable scooter',
            color: 'Black'
        },
        {
            name: 'Yamaha Exciter',
            height: 1150,
            weight: 110,
            image: 'https://example.com/exciter.jpg',
            description: 'Sporty and powerful bike',
            color: 'Blue'
        },
        {
            name: 'Honda Vision',
            height: 1080,
            weight: 95,
            image: 'https://example.com/vision.jpg',
            description: 'Modern and fuel-efficient scooter',
            color: 'White'
        },
        {
            name: 'Yamaha Sirius',
            height: 1050,
            weight: 93,
            image: 'https://example.com/sirius.jpg',
            description: 'Light and agile motorcycle',
            color: 'Red'
        }
    ],
    storeLocations: [
        {
            province: 'Da Nang',
            district: 'Hai Chau',
            commune: 'Hai Chau 1',
            address: '123 Nguyen Van Linh Street'
        },
        {
            province: 'Da Nang',
            district: 'Son Tra',
            commune: 'An Hai Bac',
            address: '456 Vo Nguyen Giap Street'
        },
        {
            province: 'Da Nang',
            district: 'Ngu Hanh Son',
            commune: 'My An',
            address: '789 Nguyen Van Thoai Street'
        },
        {
            province: 'Da Nang',
            district: 'Lien Chieu',
            commune: 'Hoa Khanh Bac',
            address: '321 Nguyen Tat Thanh Street'
        },
        {
            province: 'Da Nang',
            district: 'Cam Le',
            commune: 'Hoa Tho Dong',
            address: '654 Nguyen Huu Tho Street'
        }
    ],
    addons: [
        {
            name: 'Helmet',
            image: 'https://example.com/helmet.jpg'
        },
        {
            name: 'Raincoat',
            image: 'https://example.com/raincoat.jpg'
        },
        {
            name: 'Bike Lock',
            image: 'https://example.com/bikelock.jpg'
        },
        {
            name: 'First Aid Kit',
            image: 'https://example.com/firstaid.jpg'
        }
    ]
};

// Function to hash passwords
const hashPasswords = async (users) => {
    return Promise.all(users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
    }));
};

// Function to generate random dates
const generateRandomDates = (count) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
        const randomDays = Math.floor(Math.random() * 30); // Random date within next 30 days
        const date = new Date(today);
        date.setDate(today.getDate() + randomDays);
        dates.push(date);
    }
    return dates.sort((a, b) => a - b);
};

// Function to generate unique vehicle number
const generateUniqueVehicleNumber = (typeName, index) => {
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${typeName.substring(0, 3).toUpperCase()}${timestamp}${randomNum}`;
};

// Main seeding function
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            MotobikeType.deleteMany({}),
            StoreLocation.deleteMany({}),
            Motobike.deleteMany({}),
            Addon.deleteMany({}),
            Booking.deleteMany({}),
            Feedback.deleteMany({}),
            Message.deleteMany({}),
            Post.deleteMany({}),
            Discount.deleteMany({})
        ]);

        console.log('Cleared existing data');

        // Create users
        const hashedUsers = await hashPasswords(sampleData.users);
        const users = await User.insertMany(hashedUsers);
        console.log('Created users');

        // Create motobike types
        const motobikeTypes = await MotobikeType.insertMany(sampleData.motobikeTypes);
        console.log('Created motobike types');

        // Create store locations
        const storeLocations = await StoreLocation.insertMany(
            sampleData.storeLocations.map(location => ({
                ...location,
                owner: users.find(u => u.role === 'owner')._id
            }))
        );
        console.log('Created store locations');

        // Create addons
        const addons = await Addon.insertMany(sampleData.addons);
        console.log('Created addons');

        // Create motobikes (more bikes per type)
        const motobikes = [];
        for (const type of motobikeTypes) {
            // Create 3 bikes of each type
            for (let i = 0; i < 3; i++) {
                const motobike = await Motobike.create({
                    vehicleNumber: generateUniqueVehicleNumber(type.name, i),
                    owner: users.find(u => u.role === 'owner')._id,
                    motobikeType: type._id,
                    storeLocation: storeLocations[i % storeLocations.length]._id,
                    freeAddons: [addons[0]._id, addons[1]._id], // Helmet and Raincoat
                    pricePerDay: 200000 + (i * 50000),
                    isAvailable: true
                });
                motobikes.push(motobike);
            }
        }
        console.log('Created motobikes');

        // Create multiple bookings
        const bookingsData = [
            { status: 'completed', paymentStatus: 'succeeded', days: 2 },
            { status: 'renting', paymentStatus: 'succeeded', days: 3 },
            { status: 'canceled', paymentStatus: 'canceled', days: 1 },
            { status: 'pending_payment', paymentStatus: 'pending', days: 4 },
            { status: 'completed', paymentStatus: 'succeeded', days: 2, note: 'Another completed one' }
        ];

        const bookings = [];
        for (const data of bookingsData) {
            const randomDates = generateRandomDates(data.days);
            const randomMotobike = motobikes[Math.floor(Math.random() * motobikes.length)];
            
            const booking = {
                customerId: users.find(u => u.role === 'customer')._id,
                ownerId: users.find(u => u.role === 'owner')._id,
                motobike: [randomMotobike._id],
                totalPrice: randomMotobike.pricePerDay * data.days,
                bookedDate: randomDates,
                amountMotobike: 1,
                status: data.status,
                paymentStatus: data.paymentStatus,
                pickUpLocation: storeLocations[0].district,
                dropOffLocation: storeLocations[1].district
            };

            if (data.paymentStatus === 'succeeded') {
                booking.paidAt = new Date();
                booking.paymentIntentId = `pi_fake_${Date.now()}`;
            }

            bookings.push(booking);
        }
        await Booking.insertMany(bookings);
        console.log('Created realistic bookings');

        // Create multiple feedbacks
        for (let i = 0; i < 3; i++) {
            await Feedback.create({
                customer: users.find(u => u.role === 'customer')._id,
                owner: users.find(u => u.role === 'owner')._id,
                content: `Great service! This is feedback ${i + 1}`,
                star: Math.floor(Math.random() * 3) + 3 // Random rating between 3-5
            });
        }
        console.log('Created feedbacks');

        // Create multiple messages
        for (let i = 0; i < 5; i++) {
            await Message.create({
                sender: users.find(u => u.role === 'customer')._id,
                receiver: users.find(u => u.role === 'owner')._id,
                content: `Message ${i + 1}: Hello, I would like to book a bike`,
                isSeen: Math.random() > 0.5
            });
        }
        console.log('Created messages');

        // Create multiple posts
        for (let i = 0; i < 3; i++) {
            await Post.create({
                image: `https://example.com/post${i + 1}.jpg`,
                title: `New Bike Available ${i + 1}`,
                content: `Check out our new collection of bikes! Post ${i + 1}`,
                heart: [users.find(u => u.role === 'customer')._id],
                inDistrict: storeLocations[i % storeLocations.length].district
            });
        }
        console.log('Created posts');

        // Create multiple discounts
        for (let i = 0; i < 2; i++) {
            await Discount.create({
                owner: users.find(u => u.role === 'owner')._id,
                motobikeType: motobikeTypes[i]._id,
                isValid: true,
                percentage: 10 + (i * 5) // 10% and 15% discounts
            });
        }
        console.log('Created discounts');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase(); 