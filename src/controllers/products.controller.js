const Product = require('../models/products.model');



const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        // Cập nhật đường dẫn đầy đủ cho imageurl
        const updatedProducts = products.map(product => ({
            ...product._doc,
            imageurl: `${req.protocol}://${req.get('host')}${product.imageurl}`
        }));
        res.status(200).json(updatedProducts);
     } catch (error) {
         res.status(500).json({message: error.message});
     }
};

const getProduct = async (req, res) => {
    try {
        const { productid } = req.params;
        const product = await Product.findOne({productid: productid});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
    res.status(500).json({message: error.message});
    }
};

const createProduct = async (req, res) => {
    try{
        // Nếu người dùng đã tải lên tệp hình ảnh, lưu trữ đường dẫn vào cơ sở dữ liệu
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/assets/images/${req.file.filename}`; // Đường dẫn tạm thời trên máy chủ
        }

        // Tạo sản phẩm với thông tin từ req.body và imageUrl
        const product = await Product.create({ ...req.body, imageurl: imageUrl });
        res.status(200).json(product);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};



const updateProduct = async (req, res) => {
    try {
        const { productid } = req.params;
        const product = await Product.findOneAndUpdate({ productid: productid }, req.body, { new: true });

        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        const updateProduct = await Product.findOne({productid: productid});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try{
        const { productid } = req.params;
        const product = await Product.findOneAndDelete({ productid: productid }, req.body, { new: true });
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}