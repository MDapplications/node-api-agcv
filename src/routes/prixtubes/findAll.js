const { PrixTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/prixtubes', auth, (req, res) => {

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
            return PrixTube.findAndCountAll({where: {actif}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} prix de tubes qui correspondent à actif = ${actif}.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des prix de tubes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })

        }

        //findAll standard : 
        PrixTube.findAll()
        .then(prix => {
            const message = 'La liste des prix de tubes a bien été récupérée.'
            res.json({ message, data: prix })
        })
        .catch(err => {
            const message = `La liste des prix de tubes n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}