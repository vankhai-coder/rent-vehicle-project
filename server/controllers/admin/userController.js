import User from '../../models/userModel.js';

// Hàm lấy toàn bộ danh sách người dùng
 const getAllUsers = async (req, res) => {
    try {
        // Lấy toàn bộ danh sách người dùng từ cơ sở dữ liệu
        const users = await User.find({}, 'fullName age phone email gender address commute district province image isBanned role driverLicense identityCard');

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

// Gom vào object userController
const userController = {
    getAllUsers
  };
export default userController;