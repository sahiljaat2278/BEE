const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user');
var jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isLogin(req,res,next){
   let token=req.headers.authorization;
   console.log(token);
   if(!token){
    return res.json({
        success:false,
        message:"Please login first"
    });
   }
   let decode = jwt.verify(token,"okk");
   console.log(decode);
   if(!decode){
    return res.json({
      success:false,
      message: "Invalid token please login again"
    })
   }
   next();
    
}



app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});

app.get('/home',isLogin,(req,res)=>{
    let username;
    res.json({
        success:true,
        message:"Welcome to home page"+username
    });
})
// Endpoint to create a new user in db
app.post('/api/users/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let userExists = await User.findOne({ email: email }); // to check whether user already exists
        if (userExists) {
            return res.json({
                success: false,
                message: 'User already exists with this email please login',
            });
        }

        let newUser = new User({ name: name, email: email, password: password });
        await newUser.save();
        res.json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            error: {
                message: error.message,
            }
        });
    }
});

// Endpoint to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
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
        if(userExist.password==password){
          var token = jwt.sign({"user":userExist},"okk");//payload vo information jo hume token me rakhni hai
          return res.json({
            success: true,
            message: 'login successful',
            token:token
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
