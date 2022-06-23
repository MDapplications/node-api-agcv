const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le username est déjà pris.'
            },
            allowNull: false,
            validate: {
                notNull: { msg: `le username est une propriété requise.`},
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `le password est une propriété requise.`},
            }
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour le role.`},
                notNull: { msg: `le role est une propriété requise.`},
            }
        },
        actif: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété actif.'},
                notNull: { msg: 'La propriété actif est requise.'}
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'dateUpdate'
    })
}