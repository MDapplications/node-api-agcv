module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Commande', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nbTubesOrdered: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour le nombre de tubes commandés.'},
                notNull: { msg: 'le nombre de tubes commandés est une propriété requise.'},
                min: {
                    args: [1],
                    msg : 'le nombre de tubes commandés ne doit pas être inférieur à 1'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBoolean: { msg: 'Utilisez uniquement un booléen pour la propriété status.'},
                notNull: { msg: 'La propriété status est requise.'},
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
        },
        idPrixTube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idPrixTube.`},
                notNull: { msg: `l'idPrixTube est une propriété requise.`},
            }
        },
        idMembre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idMembre.`},
                notNull: { msg: `l'idMembre est une propriété requise.`},
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}