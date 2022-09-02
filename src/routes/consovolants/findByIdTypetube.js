const { ConsoVolant } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/consovolants', auth, (req, res) => {

        //?idTypeTube=*
        const idTypeTube = parseInt(req.query.idTypeTube)
                
        // l'Id Saison doit être supérieur à 0 et non null
        if (idTypeTube <= 0) {
            const message = `Le terme de recherche doit être supérieur à 0.`
            return res.status(400).json({message})
        } 
        // l'Id Saison doit être un nombre ou non vide
        if (isNaN(idTypeTube)) {
            const message = `Le terme de recherche doit être un nombre ou non vide.`
            return res.status(400).json({message}) 
        } 

        //recherche standard
        return ConsoVolant.findAndCountAll({where: {idTypeTube}})
        .then(({count, rows}) => {
            const message = `Il y a ${count} consommations de volant qui correspondent à l'idTypeTube ${idTypeTube}.`
            res.json({message, data: rows})
        })
        .catch(err => {
            const message = `La liste des consommations de volant n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
        
    })
}