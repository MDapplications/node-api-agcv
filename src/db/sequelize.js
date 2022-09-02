const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const SaisonModel = require('../models/Saison')
const CommandeModel = require('../models/Commande')
const CompetitionModel = require('../models/Competition')
const ConsoMoisModel = require('../models/ConsoMois')
const MembreModel = require('../models/Membre')
const PrixTubeModel = require('../models/PrixTube')
const RestockModel = require('../models/Restock')
const TypeTubeModel = require('../models/TypeTube')
const ConsoVolantModel = require('../models/ConsoVolant')
const StockModel = require('../models/Stock')
const UserModel = require('../models/User')


//Configuration de la Base de données
let sequelize 

const { NODE_ENV,
        NODE_APP_MARIADB_DATABASE, 
        NODE_APP_MARIADB_USER,
        NODE_APP_MARIADB_PASSWORD,
        NODE_APP_MARIADB_PORT,
        NODE_APP_MARIADB_HOST } = process.env


if (NODE_ENV === 'production') {
    sequelize = new Sequelize(
        NODE_APP_MARIADB_DATABASE,
        NODE_APP_MARIADB_USER,
        NODE_APP_MARIADB_PASSWORD,
        {
            port: NODE_APP_MARIADB_PORT,
            host: NODE_APP_MARIADB_HOST,
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: console.log
        }
    ) 
    console.log('Connexion BDD production...')
} else {
    sequelize = new Sequelize(
        'bdd_agcv',
        'root',
        '',
        {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: console.log
        }
    )
    console.log('Connexion BDD development...')
} 


//-----------------------------------------------------------------

//Instance des models
const Saison = SaisonModel(sequelize, DataTypes)
const Commande = CommandeModel(sequelize, DataTypes)
const Competition = CompetitionModel(sequelize, DataTypes)
const ConsoMois = ConsoMoisModel(sequelize, DataTypes)
const Membre = MembreModel(sequelize, DataTypes)
const PrixTube = PrixTubeModel(sequelize, DataTypes)
const Restock = RestockModel(sequelize, DataTypes)
const TypeTube = TypeTubeModel(sequelize, DataTypes)
const ConsoVolant = ConsoVolantModel(sequelize, DataTypes)
const Stock = StockModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

//-----------------------------------------------------------------

//Relations Saison :

//Relation OneToMany Saison -> ConsoVolants :
Saison.hasMany(ConsoVolant, {foreignKey: 'idSaison', onDelete: 'CASCADE', hooks: true})
ConsoVolant.belongsTo(Saison, {foreignKey: 'idSaison'})
//Relation OneToMany Saison -> Restocks :
Saison.hasMany(Restock, {foreignKey: 'idSaison', onDelete: 'CASCADE', hooks: true})
Restock.belongsTo(Saison, {foreignKey: 'idSaison'})
//Relation OneToMany Saison -> Commandes :
Saison.hasMany(Commande, {foreignKey: 'idSaison', onDelete: 'CASCADE', hooks: true})
Commande.belongsTo(Saison, {foreignKey: 'idSaison'})
//Relation OneToMany Saison -> Stock :
Saison.hasMany(Stock, {foreignKey: 'idSaison', onDelete: 'CASCADE', hooks: true})
Stock.belongsTo(Saison, {foreignKey: 'idSaison'})
//Relation OneToMany Saison -> Competition :
Saison.hasMany(Competition, {foreignKey: 'idSaison', onDelete: 'CASCADE', hooks: true})
Competition.belongsTo(Saison, {foreignKey: 'idSaison'})

//Relations TypeTube :

//Relation OneToMany TypeTube -> PrixTube :
TypeTube.hasMany(PrixTube, {foreignKey: 'idTypeTube', onDelete: 'CASCADE', hooks: true})
PrixTube.belongsTo(TypeTube, {foreignKey: 'idTypeTube'})
//Relation OneToMany TypeTube -> Competition :
TypeTube.hasMany(Competition, {foreignKey: 'idTypeTube', onDelete: 'CASCADE', hooks: true})
Competition.belongsTo(TypeTube, {foreignKey: 'idTypeTube'})
//Relation OneToMany TypeTube -> Restock :
TypeTube.hasMany(Restock, {foreignKey: 'idTypeTube', onDelete: 'CASCADE', hooks: true})
Restock.belongsTo(TypeTube, {foreignKey: 'idTypeTube'})
//Relation OneToMany TypeTube -> Stock :
TypeTube.hasMany(Stock, {foreignKey: 'idTypeTube', onDelete: 'CASCADE', hooks: true})
Stock.belongsTo(TypeTube, {foreignKey: 'idTypeTube'})


//Relations ConsoVolant :

//Relation OneToOne ConsoVolant -> TypeTube :
TypeTube.hasOne(ConsoVolant, {foreignKey: 'idTypeTube'})
ConsoVolant.belongsTo(TypeTube, {foreignKey: 'idTypeTube'})
//Relation OneToMany ConsoVolant -> ConsoMois :
ConsoVolant.hasMany(ConsoMois, {foreignKey: 'idConsoVolant', onDelete: 'CASCADE', hooks: true})
ConsoMois.belongsTo(ConsoVolant, {foreignKey: 'idConsoVolant'})


//Relations ConsoMois :

//Relation OneToMany ConsoMois -> Restock :
ConsoMois.hasMany(Restock, {foreignKey: 'idConsoMois', onDelete: 'CASCADE', hooks: true})
Restock.belongsTo(ConsoMois, {foreignKey: 'idConsoMois'})
//Relation OneToMany ConsoMois -> Commande :
ConsoMois.hasMany(Commande, {foreignKey: 'idConsoMois', onDelete: 'CASCADE', hooks: true})
Commande.belongsTo(ConsoMois, {foreignKey: 'idConsoMois'})

//Relations PrixTube :

//Relation OneToMany PrixTube -> ConsoMois :
PrixTube.hasMany(ConsoMois, {foreignKey: 'idPrixTube'})
ConsoMois.belongsTo(PrixTube, {foreignKey: 'idPrixTube'})
//Relation OneToMany PrixTube -> ConsoMois :
PrixTube.hasMany(Commande, {foreignKey: 'idPrixTube', onDelete: 'CASCADE', hooks: true})
Commande.belongsTo(PrixTube, {foreignKey: 'idPrixTube'})


//Relations Membre :

//Relation OneToMany Membres -> Commandes :
Membre.hasMany(Commande, {foreignKey: 'idMembre'})
Commande.belongsTo(Membre, {foreignKey: 'idMembre'})


//Relations Stock :

//Relation OneToMany Stock -> Restock :
Stock.hasMany(Restock, {foreignKey: 'idStock', onDelete: 'CASCADE', hooks: true})
Restock.belongsTo(Stock, {foreignKey: 'idStock'})
//Relation OneToMany Stock -> Competition :
Stock.hasMany(Competition, {foreignKey: 'idStock', onDelete: 'CASCADE', hooks: true})
Competition.belongsTo(Stock, {foreignKey: 'idStock'})



//-----------------------------------------------------------------

//Synchronisation des models avec la BDD
const initDb = () => {
    if (NODE_ENV === 'production') {

        return sequelize.sync().then(_ => {
            console.log('INIT MariaDB')
            console.log('La base de donnée a bien été initialisée !')
        })

    } else {

        return sequelize.sync({force: true}).then(_ => {
            console.log('INIT MariaDB')
            console.log('La base de donnée de développement a bien été initialisée !')
        })

    }    
}


//exports
module.exports = { 
  initDb, User, Saison, Commande, Competition, ConsoMois, Membre, PrixTube, Restock, TypeTube, ConsoVolant, Stock
} 