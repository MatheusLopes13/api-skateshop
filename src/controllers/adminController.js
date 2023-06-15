
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
     
            const product = req.body

                try {
                    await Product.create(product)
                    res.status(201).json({ msg: 'produto cadastrado com sucesso'})
                } catch (error) {
                    res.status(400).json({ error })
                    
                }

        }
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