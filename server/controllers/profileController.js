const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get profile data from request body
        const {
            firstName,
            lastName,
            profileImage,
            techStack,
            age,
            gender,
            degree,
            university,
            yearOfPassing
        } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                profileImage,
                techStack,
                age,
                gender,
                degree,
                university,
                yearOfPassing
            },
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully'
        });
        
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile',
            error: error.message
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile',
            error: error.message
        });
    }
};