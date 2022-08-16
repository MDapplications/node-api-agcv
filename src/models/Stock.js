module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Stock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour la valeur du stock.'},
                notNull: { msg: 'la valeur du stock est une propriété requise.'}
            }
        },
        idTypeTube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idTypeTube.`},
                notNull: { msg: `l'idTypeTube est une propriété requise.`},
            }
        },
        idSaison: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idSaison.`},
                notNull: { msg: `l'idSaison est une propriété requise.`},
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation'
    })
}