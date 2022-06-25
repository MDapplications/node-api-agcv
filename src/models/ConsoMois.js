const validMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConsoMois', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom du mois ne doit pas être vide.'},
                notNull: { msg: 'Le nom du mois est une propriété requise.'},
                isIn: [validMois]
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
        nbTubesOrdered: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour le nombre de tubes commandés.'},
                notNull: { msg: 'le nombre de tubes commandés est une propriété requise.'},
                min: {
                    args: [0],
                    msg : 'le nombre de tubes commandés ne doit pas être inférieur à 0'
                }
            }
        },
        idConsoVolant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idConsoVolant.`},
                notNull: { msg: `l'idConsoVolant est une propriété requise.`},
            }
        },
        idPrixTube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour l'idPrixTube.`},
                notNull: { msg: `l'idPrixTube est une propriété requise.`},
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}