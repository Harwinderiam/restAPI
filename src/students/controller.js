const pg = require("pg")

const pool = new pg.Pool({
    user: "harwinderkaur",
    password: "",
    database: "students",
    host: "localhost",
    port: 5432 // Default PostgreSQL port
});

const getStudents = (req,res) => {
    pool.query("SELECT * FROM students", (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error,results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req,res) => {
    const{ name, email, age, dob } = req.body;
    //Check if email exists
    pool.query('SELECT s FROM students s WHERE s.email = $1', [email] , (error,results) => {
        if (results.rows.length) {
            res.send("Email already exists");
        }
    })
}
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    createUser,
};