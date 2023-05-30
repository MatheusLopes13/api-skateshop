const { INTEGER } = require("sequelize")

module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataType.STRING(20),
        sobrenome: DataType.STRING(20),
        email: DataType.STRING(50),
        senha: DataType.STRING(70),
        endereço: DataType.STRING(70),
        numero: DataType.STRING(5),
        administrador: DataType.INTEGER

    }, {
        timestamps: false,
        tableName: 'usuario'
    }


    )

    return User
}