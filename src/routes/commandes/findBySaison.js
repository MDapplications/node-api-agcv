const { Commande } = require('../../db/sequelize')
//const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/commandes', (req, res) => {
   
        //?idSaison=*
        const idSaison = parseInt(req.query.idSaison)
  
        // l'Id Saison doit être supérieur à 0 et non null
        if (idSaison <= 0) {
            const message = `Le terme de recherche doit être supérieur à 0.`
            return res.status(400).json({message})
        } 
        // l'Id Saison doit être un nombre ou non vide
        if (isNaN(idSaison)) {
            const message = `Le terme de recherche doit être un nombre ou non vide.`
            return res.status(400).json({message}) 
        } 

        //recherche standard
        return Commande.findAndCountAll({where: {idSaison}})
        .then(({count, rows}) => {
            const message = `Il y a ${count} commandes qui correspondent à l'idSaison ${idSaison}.`
            res.json({message, data: rows})
        })
        .catch(err => {
            const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
        
    })
}