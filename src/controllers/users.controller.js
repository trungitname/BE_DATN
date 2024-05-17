const User = require('../models/users.model');


const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findOne({userid: userid});
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findOneAndUpdate({userid: userid}, req.body, { new: true});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updateUser = await User.findOne({userid: userid});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findOneAndDelete({userid: userid}, req.body, { new: true});
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}