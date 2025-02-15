const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactForm'); // Added contact form route
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line!
app.use(cookieParser());

// Configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/auth-demo' }),
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes); // Use the contact form route

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Handle root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/auth-demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

/* ------------------- Added Product API ------------------- */

// Define Product Schema & Model
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

// API to Get All Products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// API to Add a New Product (Optional)
app.post('/products', async (req, res) => {
    try {
        const { title, price, image } = req.body;
        const newProduct = new Product({ title, price, image });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).send('Error adding product');
    }
});

/* ------------------- Product API Ends ------------------- */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
