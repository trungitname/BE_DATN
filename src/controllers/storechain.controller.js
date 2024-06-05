const Storechain = require('../models/storechain.model');

const getStorechains = async (req, res) => {
    try {
        const storechanes = await Storechain.find({});
        res.status(200).json(storechanes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getStorechain = async (req, res) => {
    try {
        const { storeid } = req.params;
        const storechain = await Storechain.findOne({storeid: storeid});
        if(!storechain) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(storechain);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createStorechain = async (req, res) => {
    try {
        const storechain = await Storechain.create(req.body);
        res.status(200).json(storechain);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateStorechain = async (req, res) => {
    try {
        const { storeid } = req.params;
        const storechain = await Storechain.findOneAndUpdate({storeid: storeid}, req.body, { new: true });
        if(!storechain) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const updateStorechain = await Storechain.findOne({storeid: storeid});
        res.status(200).json(updateStorechain);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteStorechain = async (req, res) => {
    try {
        const { storeid } = req.params;
        const storechain = await Storechain.findOneAndDelete({storeid: storeid}, req.body, { new: true });
        if(!storechain) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted successfully' })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getStorechains,
    getStorechain,
    createStorechain,
    updateStorechain,
    deleteStorechain
}