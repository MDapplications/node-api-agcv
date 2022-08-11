const { Saison, ConsoVolant, Commande, Competition} = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/saisons', auth, (req, res) => {
        
        //?anneeDebut=*
        if (req.query.anneeDebut) {
            
            const anneeDebut = parseInt(req.query.anneeDebut)
            
            // l'Année de début doit être supérieur à 1999.
            if (anneeDebut <= 1999) {
                const message = `Le terme de recherche doit être supérieur à 1999.`
                return res.status(400).json({message})
            } 
            // l'Année de début doit être un nombre.
            if (isNaN(anneeDebut)) {
                const message = `Le terme de recherche doit être un nombre.`
                return res.status(400).json({message}) 
            }

            return Saison.findAndCountAll({where: {anneeDebut}, include: [ConsoVolant, Commande, Competition]})
            .then(({count, rows}) => {
                const message = `Il y a ${count} commandes qui correspondent à l'année de début ${anneeDebut}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des commandes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //?anneeFin=*
        if (req.query.anneeFin) {
            
            const anneeFin = parseInt(req.query.anneeFin)
                    
            // l'Année de fin doit être supérieur à 1999.
            if (anneeFin <= 1999) {
                const message = `Le terme de recherche doit être supérieur à 1999.`
                return res.status(400).json({message})
            } 
            // l'Année de fin doit être un nombre.
            if (isNaN(anneeFin)) {
                const message = `Le terme de recherche doit être un nombre.`
                return res.status(400).json({message}) 
            }

            return Saison.findAndCountAll({where: {anneeFin}, include: [ConsoVolant, Commande, Competition]})
            .then(({count, rows}) => {
                const message = `Il y a ${count} saisons qui correspondent à l'année de fin ${anneeFin}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des saisons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //?active=*
        if (req.query.active) {
            
            const query = req.query.active

            // actif doit être egale à 'true' ou 'false'
            if (query !== 'true' && query !== 'false') {
                const message = `Le terme de recherche doit être 'true' ou 'false'.`
                return res.status(400).json({message})
            } 

            const active = (query === 'true')

            //recherche standard
            return Saison.findAndCountAll({where: {active}, order: [ ['anneeDebut', 'DESC'] ], include: [ConsoVolant, Commande, Competition]})
            .then(({count, rows}) => {
                const message = `Il y a ${count} saisons qui correspondent.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des saisons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //findAll standard : 
        Saison.findAll()
        .then(saisons => {
            const message = 'La liste des saisons a bien été récupérée.'
            res.json({ message, data: saisons })
        })
        .catch(err => {
            const message = `La liste des saisons n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}