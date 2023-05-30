const tenisProduct = require('../database/productTenis.json')
const carrinhoProdutos = require('../database/carrinhoProdutos.json')

const teniscontroller = {
tenis: (req, res) => {
    res.render('tenis' , {tenisProduct, carrinhoProdutos: carrinhoProdutos} )
    
}
}

module.exports = teniscontroller