const validNames = ['Compétition', 'Entrainement', 'Plastique']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TypeTube', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom du type de tube ne doit pas être vide.'},
                notNull: { msg: 'Le nom du type de tube est une propriété requise.'},
                isIn: [validNames]
            }
        },
        comment: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: [0],
                    msg : `Le commentaire doit faire au moins un caractère.`
                },
                max: {
                    args: [20],
                    msg : `Le commentaire ne doit pas dépasser 20 caractères.`
                }
            }
        },
        orderable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété orderable.'},
                notNull: { msg: 'La propriété orderable est requise.'},
            }
        },
        lowLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour le seuil bas.'},
                notNull: { msg: 'le seuil bas est une propriété requise.'},
                min: {
                    args: [0],
                    msg : 'le seuil bas ne doit pas être inférieur à 0'
                }
            }
        },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété default.'},
                notNull: { msg: 'La propriété default est requise.'},
            }
        },
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}