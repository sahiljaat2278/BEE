const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json()); 

// app.get('/',(req,res)=>{
//     res.send("Hello World");
// })



//Post request with callback
// app.post('/senddata', function(req, res) {
//     const { name, email } = req.body; 
//     res.json({ name, email }); 
//     console.log(req.body);       
// });

app.post('/users', function(req, res) {
    let name = req.body.name;
    let password = req.body.password; 
    const userData = { name, password };
    let allUsers = [];
    fs.readFile('user.json', 'utf8', function(err, data){
        if(err) return res.json(err);
        if (data && data.length > 0) {
            allUsers = JSON.parse(data);
        }
        allUsers.push(userData);
        fs.writeFile('user.json', JSON.stringify(allUsers), function(err) {
            if (err) return res.send(err);
            res.json(userData);
        });
    });




    // allUsers.push(userData);
    // console.log(allUsers);
    // fs.appendFile('user.json', JSON.stringify(allUsers,null,2) + '\n', (err) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Failed to write file' });
    //     }
    //     res.json(userData);
    // });
});

app.listen(3000, function() {   
    console.log('server started');
});
