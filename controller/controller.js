const {mysql} = require('../db_conn')
const baseQuery = "SELECT p.name, p.url_image, p.price, p.discount, c.name as 'cat' FROM product p INNER JOIN category c ON c.id = p.category"

// Devuelve todos los productos
const getAll = async (req, res) =>  {
    mysql.query(
        baseQuery.concat(';'),
        (error, result) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.json(result)
            }
        }
    )
}

// Crea una cláusula pare filtrar los resultados
const filter = (searchTerm, category) => {
    // puntero para indicar si existen los filtros de nombre y categoría
    let ctrl = 0
    if (searchTerm) {
        ctrl += 1
    }
    if (category) {
        ctrl +=2
    }
    // 1: sólo búsqueda de nombre. 2: por categoría. 3: ambos
    switch (ctrl){
        case 0:
            return ";"
        case 1:
            return ` WHERE UPPER(p.name) LIKE "%${searchTerm.toUpperCase()}%";`
        case 2:
            return ` WHERE c.name = "${category.toUpperCase()}";`
        case 3:
            return ` WHERE UPPER(p.name) LIKE "%${searchTerm.toUpperCase()}% AND c.name = "${category.toUpperCase()}";`
    }
}

// Devuelve los productos por búsqueda
const getSearch = async (req, res) =>  {
    let search = req.query.term;
    let cat = req.query.cat;
    mysql.query(
        baseQuery.concat(filter(search, cat)),
        (error, result) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.json(result)
            }
        }
    )
}

module.exports = [getAll, getSearch]