const { ConsoMois, PrixTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/consomois', auth, (req, res) => {
   
        //?idConsoVolant=*
        const idConsoVolant = parseInt(req.query.idConsoVolant)
  
        // l'Id Saison doit être supérieur à 0 et non null
        if (idConsoVolant <= 0) {
            const message = `Le terme de recherche doit être supérieur à 0.`
            return res.status(400).json({message})
        } 
        // l'Id Saison doit être un nombre ou non vide
        if (isNaN(idConsoVolant)) {
            const message = `Le terme de recherche doit être un nombre ou non vide.`
            return res.status(400).json({message}) 
        } 

        //recherche standard
        return ConsoMois.findAndCountAll({where: {idConsoVolant}, include: PrixTube})
        .then(({count, rows}) => {
            const message = `Il y a ${count} ConsoMois qui correspondent à l'idConsoVolant ${idConsoVolant}.`
            res.json({message, data: rows})
        })
        .catch(err => {
            const message = `La liste des ConsoMois n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
        
    })
}