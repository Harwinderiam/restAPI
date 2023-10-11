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

module.exports = {
    getStudents,
};