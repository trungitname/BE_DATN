const Orderdetail = require('../models/orderdetails.model');
const User = require('../models/users.model');

const createOrderDetail = async (req, res) => {
    try {
        const { userid } = req.body;

        // Lấy thông tin người dùng
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Console log để kiểm tra giá sản phẩm trong cartitems
        console.log('Cart items:', user.cartitems);

        // Tạo đơn hàng chi tiết
        const newOrderDetail = new Orderdetail({
            orderdetailid: Date.now().toString(), // Tạo ID đơn hàng duy nhất
            infor: [{
                username: user.username,
                adress: user.adress,
                phonenumber: user.phonenumber,
            }],
            order: user.cartitems.map(item => ({
                productid: item.productid,
                quantity: item.quantity,
                price: item.price, // Chuyển giá sản phẩm từ cartitems vào order
                color: item.color,
                size: item.size,
                imageurl: item.imageurl
            })),
            subtotal: user.cartitems.reduce((total, item) => total + item.quantity * item.price, 0), // Tính tổng tiền
            paymentmethod: 'COD', // Ví dụ: bạn có thể thay đổi phương thức thanh toán
            status: 'Đang xử lý' // Trạng thái đơn hàng
        });

        // Lưu đơn hàng chi tiết vào cơ sở dữ liệu
        await newOrderDetail.save();

        // Xóa giỏ hàng của người dùng sau khi thanh toán
        user.cartitems = [];
        await user.save();

        res.status(200).json(newOrderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOrderdetails = async (req, res) => {
    try {
        const orderdetails = await Orderdetail.find({});
        res.status(200).json(orderdetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderdetail = async (req, res) => {
    try {
        const { orderdetailid } = req.params;
        const orderdetail = await Orderdetail.findOne({ orderdetailid: orderdetailid });
        if (!orderdetail) {
            return res.status(404).json({ message: 'Order Detail not found' });
        }
        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createOrderdetail = async (req, res) => {
    try {
        const orderdetail = await Orderdetail.create(req.body);
        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrderdetail = async (req, res) => {
    try {
        const { orderdetailid } = req.params;
        const orderdetail = await Orderdetail.findOneAndUpdate({ orderdetailid: orderdetailid }, req.body, { new: true });
        if (!orderdetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        const updateOrderdetail = await Orderdetail.findOne({ orderdetailid: orderdetailid });
        res.status(200).json(updateOrderdetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrderdetail = async (req, res) => {
    try {
        const { orderdetailid } = req.params;
        const orderdetail = await Orderdetail.findOneAndDelete({ orderdetailid: orderdetailid }, req.body, { new: true });
        if (!orderdetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.status(200).json({ message: 'Order detail deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderdetailid } = req.params;
        const { status } = req.body;

        const orderdetail = await Orderdetail.findOneAndUpdate(
            { orderdetailid: orderdetailid },
            { status: status },
            { new: true }
        );

        if (!orderdetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelOrderDetail = async (req, res) => {
    try {
        const { orderdetailid } = req.params;

        // Tìm đơn hàng chi tiết dựa trên orderdetailid
        const orderdetail = await Orderdetail.findOne({ orderdetailid });

        // Kiểm tra xem đơn hàng chi tiết có tồn tại không
        if (!orderdetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        // Kiểm tra xem đơn hàng đã được huỷ trước đó hay chưa
        if (orderdetail.status === 'Đã huỷ') {
            return res.status(400).json({ message: 'Order detail is already cancelled' });
        }

        // Cập nhật trạng thái của đơn hàng chi tiết thành 'Đã huỷ'
        orderdetail.status = 'Đã huỷ';
        await orderdetail.save();

        res.status(200).json({ message: 'Order detail cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getOrderdetails,
    getOrderdetail,
    createOrderdetail,
    updateOrderdetail,
    deleteOrderdetail,
    createOrderDetail,
    updateOrderStatus,
    cancelOrderDetail
}