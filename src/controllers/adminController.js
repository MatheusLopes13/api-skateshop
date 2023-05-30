
const { validationResult } = require('express-validator');
const carrinhoProdutos = require('../database/carrinhoProdutos.json')
const { Product } = require('../models')


const adminController = {

    renderizarAdminPage: async (req, res) => {
        try {
            const produtos = await Product.findAll()
            res.status(200).json(produtos)
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    addProduct: async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     res.status(400).json({ errors })
        // }


        // else {
            const product = req.body
            // const getProduct = await Product.findOne({
            //     where: { codigo_produto: product.codigo_produto }
            // })

            // if (getProduct) {
            //     res.send('PRODUTO JÁ CADASTRADO')
            // }
            // else {

                try {
                    await Product.create(product)
                    res.status(201).json({ msg: 'produto cadastrado com sucesso'})
                } catch (error) {
                    res.status(400).json({ error })
                    
                }
            // }

        }

    // }
    ,

    deleteProduct: async (req, res) => {
        const { id } = req.params

        const getProduct = await Product.findOne({ where: { id: id } })

        if (getProduct !== null) {
            const result = await Product.destroy({ where: { id } })

            const newProducts = await Product.findAll()

            res.status(200).json("produto excluido com sucesso")
        }

        else {
            res.send("Produto não encontrado")
        }

    },

    // updateEjs: async (req, res) => {
    //     const { id } = req.params
    //     const productToEdit = await Product.findByPk(id)

    //     if(productToEdit){
    //         try {
    //             res.status(200).json(productToEdit)
    //         } catch (error) {
    //             res.status(400).json({ error })
    //         }
    //     }
    //     else{
    //         res.status(400).json('produto não existe')
    //     }
        
    // },

    updateProduct: async (req, res) => {
        const { id } = req.params

        try {
            const productToEdit = await Product.findByPk(id)

            if (productToEdit != undefined) {

                let product = { ...req.body }

                await Product.update(
                    product, { where: { id: id } }
                )

                res.status(200).json('produto editado')
            }
            else {
                return res.status(400).json({ error: 'Produto não encontrado.' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    }


}

module.exports = adminController