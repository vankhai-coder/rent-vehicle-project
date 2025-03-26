import User from '../../models/userModel.js';

// Hàm lấy toàn bộ danh sách người dùng
 const getAllUsers = async (req, res) => {
    try {
        // Lấy toàn bộ danh sách người dùng từ cơ sở dữ liệu
        const users = await User.find({}, 'fullName age phone email gender address commute district province image isBanned role registered driverLicense identityCard');

        // Trả về danh sách người dùng
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const updateUserRegistered = async (req, res) => {
    try {
        const { userId } = req.params;
        const { registered } = req.body;

        // Kiểm tra nếu `registered` không phải true/false thì báo lỗi
        if (typeof registered !== 'boolean') {
            return res.status(400).json({ success: false, message: "Invalid registered value" });
        }

        // Tìm user và cập nhật trạng thái registered
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { registered },
            { new: true, runValidators: true } // Trả về user sau khi cập nhật
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User registration status updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating user registered status:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Gom vào object userController
const userController = {
    getAllUsers,
    updateUserRegistered
  };
export default userController;