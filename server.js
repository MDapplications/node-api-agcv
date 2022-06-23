const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')


//configuration de l'application
//------------------------------
const app = express()
const port = process.env.PORT || 3000

//Middlewares
//-----------
app
  .use(bodyParser.json())
  .use(cors())


//initialisation de Sequelize
sequelize.initDb()

//Endpoints :
//-----------

//home
app.get('/', (req, res) => {
    res.json('Hello, the API AGCV is started !')
})

//Commandes
require('./src/routes/commandes/create')(app)
require('./src/routes/commandes/delete')(app)
require('./src/routes/commandes/findById')(app)
require('./src/routes/commandes/findAll')(app)
require('./src/routes/commandes/update')(app)

//Competitions
require('./src/routes/competitions/create')(app)
require('./src/routes/competitions/delete')(app)
require('./src/routes/competitions/findById')(app)
require('./src/routes/competitions/findBySaison')(app)
require('./src/routes/competitions/update')(app)

//ConsoMois
require('./src/routes/consomois/create')(app)
require('./src/routes/consomois/delete')(app)
require('./src/routes/consomois/findById')(app)
require('./src/routes/consomois/findByTypeVolant')(app)
require('./src/routes/consomois/update')(app)

//Membres
require('./src/routes/membres/create')(app)
require('./src/routes/membres/delete')(app)
require('./src/routes/membres/findById')(app)
require('./src/routes/membres/findAll')(app)
require('./src/routes/membres/update')(app)

//PrixTubes
require('./src/routes/prixtubes/create')(app)
require('./src/routes/prixtubes/delete')(app)
require('./src/routes/prixtubes/findById')(app)
require('./src/routes/prixtubes/findAll')(app)
require('./src/routes/prixtubes/update')(app)

//Restocks
require('./src/routes/restocks/create')(app)
require('./src/routes/restocks/delete')(app)
require('./src/routes/restocks/findById')(app)
require('./src/routes/restocks/findAll')(app)
require('./src/routes/restocks/update')(app)

//Saisons
require('./src/routes/saisons/create')(app)
require('./src/routes/saisons/delete')(app)
require('./src/routes/saisons/findById')(app)
require('./src/routes/saisons/findAll')(app)
require('./src/routes/saisons/update')(app)

//Stocks
//require('./src/routes/stocks/create')(app)

//TypeTubes
require('./src/routes/typetubes/create')(app)
require('./src/routes/typetubes/delete')(app)
require('./src/routes/typetubes/findById')(app)
require('./src/routes/typetubes/findAll')(app)
require('./src/routes/typetubes/update')(app)

//TypeVolants
require('./src/routes/typevolants/create')(app)
require('./src/routes/typevolants/delete')(app)
require('./src/routes/typevolants/findById')(app)
require('./src/routes/typevolants/findAll')(app)
require('./src/routes/typevolants/update')(app)


//Users
require('./src/routes/users/create')(app)
require('./src/routes/users/delete')(app)
require('./src/routes/users/findById')(app)
require('./src/routes/users/findAll')(app)
require('./src/routes/users/update')(app)
require('./src/routes/login')(app)


//gestion de l'erreur 404 :
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))