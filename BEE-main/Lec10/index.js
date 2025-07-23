const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/index.html');
});


app.get('/addUser', (req,res)=>{
   res.sendFile(__dirname + '/addUser.html');
});
app.post('/users', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.json({
        username,
        password
    });
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});