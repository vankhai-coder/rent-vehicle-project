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

// Hàm chuyển đổi trạng thái cấm/bỏ cấm người dùng
const toggleBanUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Tìm người dùng theo ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Đảo ngược trạng thái cấm
        user.isBanned = !user.isBanned;
        
        // Lưu thay đổi
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: user.isBanned ? 'User has been banned' : 'User has been unbanned',
            isBanned: user.isBanned
        });
    } catch (error) {
        console.error('Error toggling user ban status:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Hàm xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Tìm và xóa người dùng theo ID
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'User has been deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Gom vào object userController
const userController = {
    getAllUsers,
    toggleBanUser,
    deleteUser
  };
export default userController;