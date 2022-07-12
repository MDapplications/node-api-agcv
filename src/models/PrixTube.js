module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PrixTube', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marque: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La marque ne doit pas être vide.'},
                notNull: { msg: 'La marque est une propriété requise.'},
                is: ["^([a-zA-Zéèçàöôëêùâäüûîï]+[a-zA-Zéèçàöôëêùâäüûîï0-9 -])"],
                min: {
                    args: [2],
                    msg : `La marque doit faire plus d'un caractère.`
                },
                max: {
                    args: [40],
                    msg : `La marque ne doit pas dépasser 40 caractères.`
                }
            }
        },
        prix: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: { msg: `Utilisez uniquement un nombre pour le prix.`},
                notNull: { msg: `le prix est une propriété requise.`},
                min: {
                    args: [0.01],
                    msg : `le prix ne doit pas être inférieur à 0.01`
                }
            }
        },
        prixMembre: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: { msg: `Utilisez uniquement un nombre pour le prix membre.`},
                notNull: { msg: `le prix membre est une propriété requise.`},
                min: {
                    args: [0.00],
                    msg : `le prix membre ne doit pas être inférieur à 0.00`
                }
            }
        },
        actif: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété actif.'},
                notNull: { msg: 'La propriété actif est requise.'}
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