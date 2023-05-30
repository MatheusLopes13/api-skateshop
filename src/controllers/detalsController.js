
// const carrinhoProdutos = require('../database/carrinhoProdutos.json')
const { Product } = require('../models')
// const {User} = require('../models')

const detalsController  = {
    getProduct: async (req, res) => {
        const { id }= req.params

        try {
            const product = await Product.findOne({ where: { id } })
            if(product !== null){
                res.status(200).json(product)
            }
            else{
                return res.status(400).json("produto não existe")
            }
        } catch (error) {
            res.status(400).json(error)
        }

    }
    
    }
     
    module.exports = detalsController
    
    
    
    