const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const studentRoutes = require("./src/students/routes");
const bodyParser = require('body-parser');
console.log("Created server");
const html = require('html');
const pug = require('pug');

app.set('view engine', 'pug');
app.get('/', (req, res) => {
    // Render the Pug template
    res.render('index', {
      title: 'My Website',
    });
  });
app.use(bodyParser.json());
/*app.get("/" , (req,res) => {
    res.send("Hello World");
});
console.log("Created server");
//app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.render('index.html')
});
//app.use("/students", studentRoutes)
app.post('/submit', studentRoutes);
app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
}); */
const pg = require("pg")

const pool = new pg.Pool({
    user: "harwinderkaur",
    password: "",
    database: "students",
    host: "localhost",
    port: 5432 // Default PostgreSQL port
});
// Create a route for the registration form
app.get('/register', (req, res) => {
  // Render the registration form
  res.render('registration.html');
});

// Create a route for the signup process
app.post('/signup', async (req, res) => {
  // Get the user input
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const dob = req.body.dob;

  // Validate the user input
  // ...

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user account in the database
  const client = await pool.connect();
  const query = `INSERT INTO users (username, password, name, dob) VALUES ($1, $2, $3, $4)`;
  const values = [username, hashedPassword, name, dob];
  await client.query(query, values);
  await client.release();

  // Send a success response to the client
  res.send('User account created successfully');
});

// Create a route for the login form
app.get('/login', (req, res) => {
  // Render the login form
  res.render('login.html');
});

// Create a route for the login process
app.post('/login', async (req, res) => {
  // Get the user input
  const username = req.body.username;
  const password = req.body.password;

  // Validate the user input
  // ...

  // Check if the user exists in the database
  const client = await pool.connect();
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];
  const user = await client.query(query, values);
  await client.release();

  if (!user.rows.length) {
    // User not found
    res.send('User does not exist');
    return;
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordCorrect) {
    // Password is incorrect
    res.send('Invalid password');
    return;
  }

  // Login is successful
  // ...
});

// Start the Express application
app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});
