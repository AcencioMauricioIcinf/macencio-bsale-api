const mysql = require('mysql')

// Crea una conexión a la base de datos MySQL
const dbConn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  multipleStatements: true
})

// Levanta conexión con BBDD
dbConn.connect((err) => {
if (err) {
    console.error("An error has ocurred while connecting to DB")
    console.error(err)
  } else {
    console.log(dbConn.state + " to MySQL DB with ID " + dbConn.threadId)
  }
})

module.exports = {mysql: dbConn}