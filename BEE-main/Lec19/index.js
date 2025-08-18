const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const blogsRoutes=require("./routes/blogsRoutes")
app.use("/api/blogs",blogsRoutes)

const Blogs=require("./model/user")
const Users=require("./model/userSchema")
console.log(Blogs,Users)

const userRoutes=require("./routes/userRoutes")
app.use("/api/users",userRoutes)


//DELETE BLOG

app.listen(3000,()=>{
    console.log("Server started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));