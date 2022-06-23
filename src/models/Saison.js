module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Saison', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        anneeDebut: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                msg: `L'année de début est déjà pris.`
            },
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'année de début de saison.`},
                notNull: { msg: `l'année de début de saison est une propriété requise.`},
                min: {
                    args: [2000],
                    msg : `l'année de début de saison ne doit pas être inférieur à 2000`
                }
            }
        },
        anneeFin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                msg: `L'année de fin est déjà pris.`
            },
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'année de fin de saison.`},
                notNull: { msg: `l'année de fin de saison est une propriété requise.`},
                min: {
                    args: [2000],
                    msg : `l'année de fin de saison ne doit pas être inférieur à 2000`
                }
            }
        },
        budget: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                isDecimal: { msg: `Utilisez uniquement un nombre pour le budget.`},
                notNull: { msg: `le budget est une propriété requise.`},
                min: {
                    args: [1],
                    msg : `le budget ne doit pas être inférieur à 1`
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété active.'},
                notNull: { msg: 'La propriété active est requise.'}
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}