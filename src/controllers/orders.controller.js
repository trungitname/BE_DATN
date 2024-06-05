const Order = require('../models/orders.model');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getOrder = async (req, res) => {
    try {
        const { orderid } = req.params;
        const order = await Order.findOne({orderid : orderid});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateOrder = async (req, res) => {
    try {
        const { orderid } = req.params;
        const order = await Order.findOneAndUpdate({orderid : orderid}, req.body, {new: true});
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const updateOrder = await Order.findOne({orderid : orderid});
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteOrder = async (req, res) =>{
    try {
        const { orderid } = req.params;
        const order = await Order.findOneAndDelete({orderid : orderid}, req.body, {new: true});
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({message: 'Order deleted successfully'})
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}