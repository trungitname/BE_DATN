const User = require('../models/users.model');
const Product = require('../models/products.model');

const getCartItems = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findOne({ userid: userid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = await Promise.all(user.cartitems.map(async (item) => {
            const product = await Product.findOne({ productid: item.productid });
            if (product) {
                return {
                    ...product._doc, // Lấy tất cả các thuộc tính của sản phẩm
                    imageurl: `${req.protocol}://${req.get('host')}${product.imageurl}`, // Thêm URL đầy đủ cho hình ảnh
                    quantity: item.quantity,
                    selectedSize: item.size, // Thêm selectedSize
                    selectedColor: item.color // Thêm selectedColor
                };
            } else {
                return null;
            }
        }));

        res.status(200).json(cartItems.filter(item => item !== null));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const addCartItem = async (req, res) => {
//     try {
//         const { userid } = req.params;
//         const { productid, quantity } = req.body;

//         const user = await User.findOne({ userid: userid });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const existingItem = user.cartitems.find(item => item.productid === productid);
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             user.cartitems.push({ productid, quantity });
//         }

//         await user.save();
//         res.status(200).json(user.cartitems);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const addCartItem = async (req, res) => {
    try {
        const { userid } = req.params;
        const { productid, quantity, price, size, color } = req.body;

        const user = await User.findOne({ userid: userid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingItem = user.cartitems.find(item => item.productid === productid);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cartitems.push({ productid, quantity, price, size, color  });
        }

        await user.save();
        res.status(200).json(user.cartitems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { userid, productid } = req.params;

        const user = await User.findOne({ userid: userid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cartitems = user.cartitems.filter(item => item.productid !== productid);
        await user.save();
        res.status(200).json(user.cartitems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCartItems,
    addCartItem,
    removeCartItem
};
