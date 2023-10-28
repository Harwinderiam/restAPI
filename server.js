const express = require("express");
const app = express();
const port = 3000;
const path = require('path');

const studentRoutes = require("./src/students/routes");
console.log("Created server");
/*app.get("/" , (req,res) => {
    res.send("Hello World");
});*/
console.log("Created server");
//app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//app.use("/students", studentRoutes)

app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
});
