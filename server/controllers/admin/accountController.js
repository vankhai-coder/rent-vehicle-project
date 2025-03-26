import User from '../../models/userModel.js'

export const getAllAccountsBaseOnRole = async (req, res) => {
    try {
        const { role } = req.user;
        const { roleToFind } = req.body
        // Check if the user has an admin role
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }

        // Fetch all customers
        const customers = await User.find({ role: roleToFind }).select(
            '_id isBanned fullName email gender address commune district province image identityCard.before driverLicense.before'
        ).sort({ createdAt: -1 })

        // Format the data
        const formattedCustomers = customers.map(customer => {
            const { address, commune, district, province } = customer;

            // Conditionally construct the address if all fields exist
            const formattedAddress =
                address && commune && district && province
                    ? `${address}, ${commune}, ${district}, ${province}`
                    : undefined;

            return {
                _id: customer._id,
                isBanned: customer.isBanned,
                fullName: customer.fullName || customer.email, // Use fullName or email
                gender: customer.gender,
                address: formattedAddress, // Include address only if all fields exist
                image: customer.image || '/default_avt.jpg', // Default image if no custom image
                identityCardBefore: customer.identityCard.before,
                driverLicenseBefore: customer.driverLicense.before
            };
        });

        return res.status(200).json(formattedCustomers);
    } catch (error) {
        console.error('Error fetching customers: ', error.message);
        return res.status(500).json({ message: 'Error fetching customers.' });
    }
};

export const banAccountByUserId = async (req, res) => {
    const { banId } = req.body; // Extract the banId from the request body

    try {
        // Check if the user has an admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        // Find the user by ID
        const user = await User.findById(banId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update the isBanned status to true
        user.isBanned = !user.isBanned
        await user.save();

        return res.status(200).json({ message: "User has been banned successfully." });
    } catch (error) {
        console.error("Error banning account: ", error.message);
        return res.status(500).json({ message: "Error banning account." });
    }
};

