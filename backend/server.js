const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let cafes = [
    { id: 1, name: "The Coffee House", items: ["Cappuccino - ₹150", "Veg Sandwich - ₹120"] },
    { id: 2, name: "Bake & Shake", items: ["Burger - ₹199", "Chocolate Shake - ₹140"] }
];

let orders = [];

app.get('/api/cafes', (req, res) => {
    res.json(cafes);
});

app.post('/api/order', (req, res) => {
    const { cafeName, item, customerName, address } = req.body;
    const newOrder = {
        id: orders.length + 1,
        cafeName,
        item,
        customerName,
        address,
        status: 'Pending'
    };
    orders.push(newOrder);
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.post('/api/order/status', (req, res) => {
    const { orderId, status } = req.body;
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        res.json({ message: 'Order status updated', order });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});
