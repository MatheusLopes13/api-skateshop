
// const allProducts = require('../database/allProduct.json')
// const carrinhoProdutos = require('../database/carrinhoProdutos.json')
const { Op } = require('sequelize')

const {Product} = require('../models')

const homeController = {
home: async (req, res) => {
  try {
    const produto = await Product.findAll()
     res.status(200).json(produto)

  } catch (error) {
    res.status(400).json({ error })
  }
}, 


search: async (req, res) => {
    let search = req.query.keywords
    try {
      const result = await Product.findAll({
        where: {
          nome: {
            [Op.substring]: search 
          }
        }
      }) 
      res.status(200).json(result)
      
    } catch (error) {
      res.status(400).json({ error })
    }
    
}

}

module.exports = homeController