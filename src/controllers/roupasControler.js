const roupasProduct = require('../database/productRoupas.json')
const carrinhoProdutos = require('../database/carrinhoProdutos.json')

const roupasController = {
    roupasPage: (req, res) => {
        res.render('roupas', {roupasProduct: roupasProduct, carrinhoProdutos: carrinhoProdutos })
    }
}
module.exports = roupasController
