const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const auth = require('../middlewares/auth')
const detalsController = require('../controllers/detalsController')
const homeController = require('../controllers/homeController')
const adminController = require('../controllers/adminController');
const loginController = require('../controllers/loginController')


// Rotas ja em padrão REST
router.get('/products',  homeController.home)
router.get('/detals/:id', detalsController.getProduct)
router.delete('/admin/delete/:id', auth, adminController.deleteProduct)
router.put('/update/:id', auth,  adminController.updateProduct)
router.post('/login',  loginController.logarUsuario)
router.get('/admin', adminController.renderizarAdminPage)
router.post('/product', auth,
//     body('nome').notEmpty().withMessage('Marca precisa ser preenchido!'),
//     body('valor').notEmpty().withMessage('Valor precisa ser preenchido!'),
//     body('tamanho').notEmpty().withMessage('Tamanho precisa ser preenchido!'),
//     body('descricao').notEmpty().withMessage('Descrição precisa ser preenchido!'),
//     body('cor').notEmpty().withMessage('Cor precisa ser preenchido!'),
  adminController.addProduct)
router.get('/search', homeController.search)
router.post('/criarconta',
body('nome').notEmpty().withMessage('Nome precisa ser preenchido!'),
body('sobrenome').notEmpty().withMessage('Sobrenome precisa ser preenchido!'), 
body('email').notEmpty().withMessage('Email precisa ser preenchido!'),
body('rua').notEmpty().withMessage('Rua precisa ser preenchido!'),
body('numero').notEmpty().withMessage('Número precisa ser preenchido!'),
//body('cep').notEmpty().withMessage('CEP precisa ser preenchido!'),
body('senha').notEmpty().withMessage('Senha precisa ser preenchido!'),
body('confirma').isEmpty().withMessage('Confirmar senha precisa ser preenchido!'),
loginController.cadastrarUsuario)


module.exports = router
 


