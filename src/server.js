const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/products.model');
const productsRoute = require('./routes/products.route');
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.listen(8000, () =>{
    console.log('Server is running on port 8000');
});

// routes
app.use('/api/products', productsRoute);


app.get('/', (req, res) =>{
    res.send("Hello from node api Server!");
});



// Hiển thị
// app.get('/api/products', async (req, res) =>{
//     try {
//        const products = await Product.find({});
//        res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// Tim theo id
// app.get('/api/products/:productid', async (req, res) => {
//     try {
//         const { productid } = req.params;
//         const product = await Product.findOne({productid: productid});
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//     res.status(500).json({message: error.message});
//     }
// });

// Thêm
// app.post('/api/products', async (req, res) =>{
//     try{
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     } catch (error){
//         res.status(500).json({message: error.message});
//     }
// });

// Sua
// app.put('/api/products/:productid', async (req, res) => {
//     try {
//         const { productid } = req.params;
//         const product = await Product.findOneAndUpdate({ productid: productid }, req.body, { new: true });

//         if(!product){
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         const updateProduct = await Product.findOne({productid: productid});
//         res.status(200).json(updateProduct);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// Xoa
// app.delete('/api/products/:productid', async (req, res) =>{
//     try{
//         const { productid } = req.params;
//         const product = await Product.findOneAndDelete({ productid: productid }, req.body, { new: true });
//         if(!product){
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product deleted successfully' })
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }
// });


mongoose.connect("mongodb+srv://phamcongtrung208:0977184457Tp@rollingbase.0gbpvov.mongodb.net/rollingbaseshop?retryWrites=true&w=majority&appName=RollingBase")
.then(() =>{
    console.log("Connected to DB");
})
.catch(() =>{
    console.log("Connection failed");
});

















// import express from 'express';
// import bodyParser from 'body-parser';
// import { MongoClient } from 'mongodb';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import history from 'connect-history-api-fallback';
// import { error } from 'console';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express(); // Tạo ra một ứng dụng Express

// app.use(bodyParser.json());
// // Cấu hình các middleware khác ở đây...
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// }); 

// app.use(express.static(path.resolve(__dirname, '../dist'), {maxAge: '1y', etag: false}));
// app.use(history());


// // Kết nối tới cơ sở dữ liệu MongoDB và bắt đầu lắng nghe trên cổng 8000
// const CONNECTION_STRING = "mongodb+srv://admin:0977184457Tp@rollingbase.0gbpvov.mongodb.net/?retryWrites=true&w=majority&appName=RollingBase";
// const DATABASE_NAME = "rollingbaseshop";

// MongoClient.connect(CONNECTION_STRING)
//     .then(client => {
//         const database = client.db(DATABASE_NAME);
//         console.log("Connected to MongoDB");

//         app.get('/api/products', async (req, res) => {
//           try {
//               const products = await database.collection('products').find({}).toArray();
//               res.status(200).json(products);
//           } catch (error) {
//               console.error("Error fetching products:", error);
//               res.status(500).send("Error fetching products");
//           }
//         });
//         app.listen(8000, () => {
//             console.log('Server is listening on port 8000');
//         });
//     })
//     .catch(error => {
//         console.error("Error connecting to MongoDB:", error);
    
// });









// // const app = express();
// // app.use(bodyParser.json());

// // app.use('/images', express.static(path.join(__dirname, '../assets')));


// // app.get('/api/products', async (req, res) =>{
// //     // const client = await MongoClient.connect(
// //     //   'mongodb://localhost:27017',
// //     //   { useNewUrlParser: true, useUnifiedTopology: true},
// //     // );
// //     const client = await MongoClient.connect('mongodb://localhost:27017');

// //     const db = client.db('rb-db');
// //     const products = await db.collection('products').find({}).toArray();

// //     res.status(200).json(products);
// //     client.close();
// // });

// // app.get('/api/users/:userId/cart', async (req, res)=>{
// //     const {userId} = req.params;
// //     // const client = await MongoClient.connect(
// //     //   'mongodb://localhost:27017',
// //     //   { useNewUrlParser: true, useUnifiedTopology: true},
// //     // );
// //     const client = await MongoClient.connect('mongodb://localhost:27017');

// //     const db = client.db('rb-db');
// //     const user = await db.collection('users').findOne({id: userId});
// //     if (!user) return res.status(404).json('Could not find user');
// //     const products = await db.collection('products').find({}).toArray();
// //     const cartItemIds = user.cartItems;
// //     const cartItems = cartItemIds.map( id => 
// //       products.find(product => product.id === id)
// //     );
// //     res.status(200).json(cartItems);
// //     client.close();
// // });

// // app.get('/api/products/:productId', async (req, res)=>{
// //     const {productId} = req.params;
// //     // const client = await MongoClient.connect(
// //     //   'mongodb://localhost:27017',
// //     //   { useNewUrlParser: true, useUnifiedTopology: true},
// //     // );
// //     const client = await MongoClient.connect('mongodb://localhost:27017');

// //     const db = client.db('rb-db');
// //     const product = await db.collection('products').findOne({ id: productId});

// //     if (product){
// //         res.status(200).json(product);
// //     }else {
// //         res.status(404).json('Could not find the product!');
// //     }
// //     client.close();
// // });

// // app.post('/api/users/:userId/cart', async (req, res) =>{
// //     const {productId} = req.body;
// //     const {userId} = req.params;
// //     // const client = await MongoClient.connect(
// //     //   'mongodb://localhost:27017',
// //     //   { useNewUrlParser: true, useUnifiedTopology: true},
// //     // );
// //     const client = await MongoClient.connect('mongodb://localhost:27017');

// //     const db = client.db('rb-db');
// //     await db.collection('users').updateOne({ id: userId}, {$addToSet: {cartItems: productId}},);
// //     const user = await db.collection('users').findOne({id: userId});
// //     const products = await db.collection('products').find({}).toArray();   
// //     const cartItemIds = user.cartItems;
// //     const cartItems = cartItemIds.map(id =>
// //       products.find(product => product.id === id)
// //     );
// //     res.status(200).json(cartItems);
// //     client.close();
// // });

// // app.delete('/api/users/:userId/cart/:productId', async (req, res) =>{
// //     const { userId, productId} = req.params;

// //     const client = await MongoClient.connect('mongodb://localhost:27017');
// //     const db = client.db('rb-db');
// //     await db.collection('users').updateOne({ id: userId}, {
// //       $pull: { cartItems: productId},
// //     });
// //     const user = await db.collection('users').findOne({ id: userId});
// //     const products = await db.collection('products').find({}).toArray();  
// //     const cartItemIds = user.cartItems;
// //     const cartItems = cartItemIds.map(id =>
// //       products.find(product => product.id === id)
// //     );

// //     res.status(200).json(cartItems);
// //     client.close();
// // });  

// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../dist/index.html'));
// // });
 
// // app.listen(8000, () =>{
// //     console.log('Server is listening on port 8000');
// // });