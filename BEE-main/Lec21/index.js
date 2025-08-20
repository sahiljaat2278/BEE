const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./model/user');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});

//endpoint to create a new user in db

    app.post('/api/users/signup', async (req, res) => {
        try{
        let { name, email, password } = req.body;
        let userExists = await User.findOne({ email:email }); // to check whether user already exists
        if (userExists) {
            return res.json({
                success: false,
                message: 'User already exists with this email please login',
            })
        }

        let newUser = new User({ name:name, email:email, password:password });
        await newUser.save();
        res.json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
        } catch (error) {
            console.log(error.message);
            res.json({
            error:{
               message: error.message,
            }
            });
            }
    });
    


app.post('/api/auth/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let userExist = await User.findOne({ email: email, password: password });
        if (!userExist) {
            return res.json({
                success: false,
                message: 'user does not exist please signup',
            });
        }
    
        if(userExist.password!=password){
          return res.json({
            success: false,
            message: 'Incorrect password',
          });
       }
        if(userExist.password=password){
          return res.json({
            success: true,
            message: 'login successful',
          });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: {
                message: error.message,
            }
        });
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