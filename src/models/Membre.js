module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Membre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le prénom ne doit pas être vide.'},
                notNull: { msg: 'Le prénom est une propriété requise.'},
                is: {
                    args:['^([A-Z]+[a-zA-Zéèçàöôëêùâäüûîï -]*)']
                },
                min: {
                    args: [2],
                    msg : `Le prénom doit faire plus d'un caractère.`
                },
                max: {
                    args: [40],
                    msg : `Le prénom ne doit pas dépasser 40 caractères.`
                }
            }
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom ne doit pas être vide.'},
                notNull: { msg: 'Le nom est une propriété requise.'},
                is: {
                    args:['^([A-Z]+[a-zA-Zéèçàöôëêùâäüûîï -]*)']
                },
                min: {
                    args: [2],
                    msg : `Le nom doit faire plus d'un caractère.`
                },
                max: {
                    args: [40],
                    msg : `Le nom ne doit pas dépasser 40 caractères.`
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
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}