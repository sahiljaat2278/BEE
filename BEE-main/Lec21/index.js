const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./model/user');
app.use(express.json());



app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});

//endpoint to create a new user in db
app.post('/api/users/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, 
                message: "User already exists with this email please login" });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





mongoose.connect("mongodb://localhost:27017/blogapp", {
    
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(3000,(req,res)=>{
    console.log(`Server is running on port 3000`);
});