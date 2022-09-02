const { Stock } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/stocks', auth, (req, res) => {

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
            return Stock.findAndCountAll({where: {idSaison}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} stocks qui correspondent à l'idSaison ${idSaison}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des stocks n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //?idSaison=*
        if (req.query.idTypeTube) {
            
            const idTypeTube = parseInt(req.query.idTypeTube)
                    
            // l'Id Saison doit être supérieur à 0 et non null
            if (idTypeTube <= 0) {
                const message = `Le terme de recherche doit être supérieur à 0.`
                return res.status(400).json({message})
            } 
            // l'Id Saison doit être un nombre
            if (isNaN(idTypeTube)) {
                const message = `Le terme de recherche doit être un nombre.`
                return res.status(400).json({message}) 
            } 

            //recherche standard
            return Stock.findAndCountAll({where: {idTypeTube}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} stocks qui correspondent à l'idTypeTube ${idTypeTube}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des stocks n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }

        //findAll standard : 
        Stock.findAll()
        .then(stocks => {
            const message = 'La liste des stocks a bien été récupérée.'
            res.json({ message, data: stocks })
        })
        .catch(err => {
            const message = `La liste des stocks n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}