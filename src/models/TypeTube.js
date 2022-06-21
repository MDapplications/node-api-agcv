const validNames = ['Compétition', 'Entrainement', 'Plastique']
const validTypes = ['normal', 'test']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TypeTube', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `L'usage ne doit pas être vide.`},
                notNull: { msg: `L'usage est une propriété requise.`},
                isIn: [validTypes]
            }
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
    }, 
    {
        timestamps: true,
        createdAt: 'dateCreation',
        updatedAt: 'horodatage'
    })
}