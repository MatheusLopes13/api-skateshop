// eu criei meu objeto Login que tem um atributo e esse atributo é uma função

const { validationResult } = require('express-validator');
const allProducts = require('../database/allProduct.json')
const carrinhoProdutos = require('../database/carrinhoProdutos.json');
const {User} = require('../models')

const loginController = {
// aqui é o meu atributo função   
    renderizarTelaLogin: (req, res) => {
        res.render('login')
    },
    cadastrarUsuario: async (req, res) => {
        //aqui eu fiz uma receitinha de bolo pro meu sistema me retornar caso encontre erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            res.render('login', { errors: errors.array() })
        } else {
            const data = req.body
            console.log(data)
            const usuario = await User.findOne({ where: { email: data.email } })
            if (usuario) {
                res.render('login', {errors:[{msg: 'Email já em uso.'}]})
            }

            else if (data.senha !== data.confirmarsenha ){
                res.render('login', {errors: [{ msg: 'Senhas não coincidem.' }]})
            }

            data.administrador = 0
            delete data.confirmarsenha

            const newUser = await User.create(data);
            res.render('login', {sucess: [{msg: 'Usuario ' + newUser.nome + ' criado com sucesso'}]})

           
        }
    },

    //aqui a mesma coisa, verificando se tem erro
    logarUsuario: async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            res.render('login', { errors: errors.array() })
        } else {

            //req.body é onde o front me envia infos, aqui eu recebo email e senha enviado pelo usuario
            const email = req.body.email
            const senha = req.body.senha
            // aqui estou tentando encontrar alguem que tenha o mesmo email e senha digitados na pg de login
            const usuario = await User.findOne({ where: { email: email, senha: senha } })
            console.log('>>>>>',usuario)
            // se caso o usuario nao for cadastrado 
            if(usuario === null) {
                res.render('login', { errors: [{ msg:'Usuario não encontrado' }] })
            } else {
                const userLogged = usuario.dataValues
                let iniciais = ''
                iniciais += userLogged.nome.substring(0, 1)
                iniciais += userLogged.sobrenome.substring(0, 1)
                userLogged.iniciais = iniciais
                console.log('usuario>>>', usuario.dataValues);
                res.render('home', { usuario: userLogged, carrinhoProdutos: carrinhoProdutos  });

            }
        }

        
    },   
    deslogarUsuario: (req, res) => {
        res.render('home', { allProducts, carrinhoProdutos: carrinhoProdutos  });

    }
} 
// aqui eu to exportando o meu objeto
module.exports= loginController
