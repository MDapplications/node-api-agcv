module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Restock', {
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
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour la valeur.'},
                notNull: { msg: 'la valeur est une propriété requise.'},
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
        idConsoMois: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idConsoMois.`},
                notNull: { msg: `l'idConsoMois est une propriété requise.`},
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}