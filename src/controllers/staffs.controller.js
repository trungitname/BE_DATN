const Staff = require('../models/staffs.model');

const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({});
        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getStaff = async (req, res) => {
    try {
        const { staffid } = req.params;
        const staff = await Staff.findOne({staffid : staffid});
        if (!staff) {
            return res.status(200).json({ message: 'Staff not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateStaff = async (req, res) => {
    try {
        const { staffid } = req.params;
        const staff = await Staff.findOneAndUpdate({staffid : staffid}, req.body, { new: true });
        if (!staff) {
            return res.status(200).json({ message: 'Staff not found' });
        }
        const updateStaff = await Staff.findOne({staffid : staffid});
        res.status(200).json(updateStaff);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteStaff = async (req, res) => {
    try {
        const { staffid } = req.params;
        const staff = await Staff.findOneAndDelete({staffid : staffid}, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        return res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
}