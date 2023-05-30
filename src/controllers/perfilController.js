// eu criei meu objeto Login que tem um atributo e esse atributo é uma função

const { validationResult } = require('express-validator');
const allProducts = require('../database/allProduct.json')
const carrinhoProdutos = require('../database/carrinhoProdutos.json')

const perfilController = {
    renderizarTelaPerfil: (req, res) => {
        res.render('perfil', {carrinhoProdutos})
    }, 
    editarPerfil: (req, res) => {
        console.log(req.body)
    }
    
     
} 


module.exports= perfilController
