//middleware - function which run on client requests before controller functions

const express = require("express");
const { m1, m2 } = require("./middleware/firstmiddleware");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(m1);
app.use(m2);
app.get("/health", (req, res) => {
   console.log("running controller function");
   res.json({ status: "OK",
    message: "Server is healthy",
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
