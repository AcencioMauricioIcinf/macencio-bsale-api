// Importa módulos para manejar consultas a la api
const {Router} = require('express')
const router = Router()
const [getAll, getSearch] = require('./controller')

// Devuelve todos los productos
router.route('/').get(getAll)

// Devuelve los productos por búsqueda
router.route('/search').get(getSearch)

module.exports = router