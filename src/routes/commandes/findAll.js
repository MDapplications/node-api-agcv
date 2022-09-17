const { Commande, Membre, PrixTube, ConsoMois, TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/commandes', auth, (req, res) => {

        //?idSaison=*
        if (req.query.idSaison) {
            
            const idSaison = parseInt(req.query.idSaison)
                    
            // l'Id Saison doit être supérieur à 0 et non null
            if (idSaison <= 0) {
                const message = `Le terme de recherche doit être supérieur à 0.`
                return res.status(400).json({message})
            } 
            // l'Id Saison doit être un nombre
            if (isNaN(idSaison)) {
                const message = `Le terme de recherche doit être un nombre.`
                return res.status(400).json({message}) 
            } 

            //recherche standard
            return Commande.findAndCountAll({where: {idSaison}, order: [ ['id', 'DESC'] ], include: [Membre, {model: PrixTube, include: TypeTube}, ConsoMois]})
            .then(({count, rows}) => {
                const message = `Il y a ${count} commandes qui correspondent à l'idSaison ${idSaison}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //?idMembre=*
        if (req.query.idMembre) {
            
            const idMembre = parseInt(req.query.idMembre)
                    
            // l'Id Saison doit être supérieur à 0 et non null
            if (idMembre <= 0) {
                const message = `Le terme de recherche doit être supérieur à 0.`
                return res.status(400).json({message})
            } 
            // l'Id Saison doit être un nombre
            if (isNaN(idMembre)) {
                const message = `Le terme de recherche doit être un nombre.`
                return res.status(400).json({message}) 
            } 

            //recherche standard
            return Commande.findAndCountAll({where: {idMembre}, order: [ ['id', 'DESC'] ], include: [Membre, {model: PrixTube, include: TypeTube}, ConsoMois]})
            .then(({count, rows}) => {
                const message = `Il y a ${count} commandes qui correspondent à l'idMembre ${idMembre}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //findAll standard : 
        Commande.findAll({include: [Membre, {model: PrixTube, include: TypeTube}, ConsoMois]})
        .then(commandes => {
            const message = 'La liste des commandes a bien été récupérée.'
            res.json({ message, data: commandes })
        })
        .catch(err => {
            const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}