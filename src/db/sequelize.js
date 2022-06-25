const { Sequelize, DataTypes } = require('sequelize')

const SaisonModel = require('../models/Saison')
const CommandeModel = require('../models/Commande')
const CompetitionModel = require('../models/Competition')
const ConsoMoisModel = require('../models/ConsoMois')
const MembreModel = require('../models/Membre')
const PrixTubeModel = require('../models/PrixTube')
const RestockModel = require('../models/Restock')
const TypeTubeModel = require('../models/TypeTube')
const ConsoVolantModel = require('../models/ConsoVolant')
const UserModel = require('../models/User')

//Configuration de la Base de données
let sequelize 

const { NODE_APP_MARIADB_DATABASE, 
        NODE_APP_MARIADB_USER,
        NODE_APP_MARIADB_PASSWORD,
        NODE_APP_MARIADB_HOST} = process.env

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        `${NODE_APP_MARIADB_DATABASE}`,
        `${NODE_APP_MARIADB_USER}`,
        `${NODE_APP_MARIADB_PASSWORD}`,
        {
            host: `${NODE_APP_MARIADB_HOST}`,
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: true
        }
    )
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
            logging: false
        }
    )
}



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
const User = UserModel(sequelize, DataTypes)


//Synchronisation des models avec la BDD
const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
            console.log('INIT MariaDB')
            console.log('La base de donnée a bien été initialisée !')
        })
}


//exports
module.exports = { 
  initDb, User, Saison, Commande, Competition, ConsoMois, Membre, PrixTube, Restock, TypeTube, ConsoVolant
} 