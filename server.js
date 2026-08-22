const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Dummy user
const user = {
    username: "admin",
    password: "1234"
};

// Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Products
const products = [
    { name: "Floral Summer Dress", category: "Summer", price: 25 },
    { name: "Light Cotton Dress", category: "Summer", price: 20 },
    { name: "Casual Denim Dress", category: "Casual", price: 30 },
    { name: "Simple Casual Wear", category: "Casual", price: 22 }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
