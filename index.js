const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// Función para levantar el backend
const main = async () => {
  //Levanta app en el puerto
  app.listen(PORT)
  console.log("Listening on port " + PORT)
  // Levanta conexión a BBDD
  require('./db_conn')
}

// Aceptar consultas de otros sitios
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Página principal (sub-básica)
app.get('/', function (req, res) {
  res.send('Ud. ha llegato al backend de bsale de m.acencio')
})

// Router para consumir API
app.use('/api', require('./controller/router'))

// Levanta el backend
main();
