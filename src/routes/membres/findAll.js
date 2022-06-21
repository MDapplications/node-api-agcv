const { Membre } = require('../../db/sequelize')
//const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/membres', (req, res) => {


        if (req.query.actif) {

            //?actif=*
            const query = req.query.actif
            
            // actif doit être egale à 'true' ou 'false'
            if (query !== 'true' && query !== 'false') {
                const message = `Le terme de recherche doit être 'true' ou 'false'.`
                return res.status(400).json({message})
            } 

            const actif = (query === 'true')

            //recherche standard
            return Membre.findAndCountAll({where: {actif}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} membres qui correspondent à actif = ${actif}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des membres n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })

        }










        Membre.findAll()
        .then(membres => {
            const message = 'La liste des membres a bien été récupérée.'
            res.json({ message, data: membres })
        })
        .catch(err => {
            const message = `La liste des membres n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}