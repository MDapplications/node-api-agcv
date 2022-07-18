module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConsoVolant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour le stock.`},
                notNull: { msg: `le stock est une propriété requise.`},
                min: {
                    args: [0],
                    msg : `Le stock ne peut pas être négatif.`
                }
            }
        },
        idSaison: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idSaison.`},
                notNull: { msg: `l'idSaison est une propriété requise.`},
            }
        },
        idTypeTube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idTypeTube.`},
                notNull: { msg: `l'idTypeTube est une propriété requise.`},
            }
        } 
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}