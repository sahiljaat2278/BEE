const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Blogs = require('./model/user');

app.post('/blog',async (req,res)=>{
    let {title, body} = req.body;
    let newBlog = new Blogs({
        title: title,
        body: body,
        date: new Date()
    });
    await newBlog.save();
    res.json({
        success: true, 
        data: newBlog,
        message: "Blog created successfully"
    });
})
app.get('/blog',async (req,res)=>{
    let allBlogs = await Blogs.find();
    res.json({
        success: true,
        data: allBlogs,
    });
});
app.get('/blog/:id',async (req,res)=>{
    let {id} = req.params;
    let blog = await Blogs.findOne({_id: id});
    res.json({
        success: true,
        data: blog,
    });
});



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected! 127.0.0.1:27017'));