const express = require("express");
const app = express();
const port = 3000;
const studentRoutes = require("./src/students/routes");

app.get("/" , (req,res) => {
    res.send("Hello World");
});

app.use(express.json());

app.use("/students", studentRoutes)

app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
});
