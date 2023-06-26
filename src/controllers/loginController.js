// eu criei meu objeto Login que tem um atributo e esse atributo é uma função

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const loginController = {

    cadastrarUsuario: async (req, res) => {
        //aqui eu fiz uma receitinha de bolo pro meu sistema me retornar caso encontre erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            res.send( { errors: errors.array() })
        } else {
            const data = req.body
           
            const usuario = await User.findOne({ where: { email: data.email } })
            if (usuario) {
                res.send({msg: 'Email já em uso.'})
            }

            else if (data.senha !== data.confirma ){
                res.send( {errors: [{ msg: 'Senhas não coincidem.' }]})
            }

            data.administrador = 0
            delete data.confirma

            const newUser = await User.create(data);
            res.send({sucess: [{msg: 'Usuario ' + newUser.nome + ' criado com sucesso'}]})

           
        }
    },

    //aqui a mesma coisa, verificando se tem erro
    logarUsuario: async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            throw new Error({errors: errors.array() })
        } else {

            //req.body é onde o front me envia infos, aqui eu recebo email e senha enviado pelo usuario
            const email = req.body.email
            const senha = req.body.senha
            // aqui estou tentando encontrar alguem que tenha o mesmo email e senha digitados na pg de login
            const usuario = await User.findOne({ where: { email: email, senha: senha } })
          
            // se caso o usuario nao for cadastrado 
            if(usuario === null) {
                res.status(400).send({ error: 'Usuario não encontrado' })
            } else {
               
                const token = jwt.sign({ id: usuario.id , email: usuario.email , iat: Math.floor(Date.now / 1000 ) - 30  }, 'segredo',{ expiresIn: '30m'})
               
                res.send({  token }); 

            }
        }

        
    },

    buscarUsuarioPorId: async (req, res) => {
        const { id } = req.params;
        
        const usuarioLogado = await User.findOne({ where: { id: id } })
        
        if(usuarioLogado && usuarioLogado.dataValues){
            const userLogged = usuarioLogado.dataValues
            let iniciais = ''
            iniciais += userLogged.nome.substring(0, 1)
            iniciais += userLogged.sobrenome.substring(0, 1)
            userLogged.iniciais = iniciais
            delete userLogged.senha
            res.status(200).send({ user: userLogged })
        } else {
            res.status(200).send({ user: null })
        }
        



    }
} 
// aqui eu to exportando o meu objeto
module.exports= loginController
