module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Competition', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notEmpty: { msg: 'Le nom de la compétition ne doit pas être vide.'},
                notNull: { msg: 'Le nom de la compétition est une propriété requise.'},
                is: ["^([a-zA-Zéèçàöôëêùâäüûîï]+[a-zA-Zéèçàöôëêùâäüûîï0-9 -])"],
                min: {
                    args: [2],
                    msg : `Le nom de la compétition doit faire plus d'un caractère.`
                },
                max: {
                    args: [40],
                    msg : `Le nom de la compétition ne doit pas dépasser 40 caractères.`
                }
            }
        },
        nbTubesUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour le nombre de tubes utilisés.'},
                notNull: { msg: 'le nombre de tubes utilisés est une propriété requise.'},
                min: {
                    args: [0],
                    msg : 'le nombre de tubes utilisés ne doit pas être inférieur à 0'
                }
            }
        },
        idStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idStock.`},
                notNull: { msg: `l'idStock est une propriété requise.`},
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