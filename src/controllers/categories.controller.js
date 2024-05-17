const Category = require('../models/categories.model');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getCategory = async (req, res) => {
    try {
        const { categoryid } = req.params;
        const category = await Category.findOne({categoryid: categoryid});
        if (!category){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryid } = req.params;
        const category = await Category.findOneAndUpdate({categoryid: categoryid}, req.body, { new: true});
        if(!category) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updateCategory = await Category.findOne({categoryid: categoryid});
        res.status(200).json(updateCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryid } = req.params;
        const category = await Category.findOneAndDelete({categoryid: categoryid}, req.body, { new: true});
        if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}