const { TypeTube } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/typetubes', auth, (req, res) => {

        //?orderable=*
        if (req.query.orderable) {
            
            const query = req.query.orderable

            // actif doit être egale à 'true' ou 'false'
            if (query !== 'true' && query !== 'false') {
                const message = `Le terme de recherche doit être 'true' ou 'false'.`
                return res.status(400).json({message})
            } 

            const orderable = (query === 'true')

            //recherche standard
            return TypeTube.findAndCountAll({where: {orderable}})
            .then(({count, rows}) => {
                const message = `Il y a ${count} typetubes qui correspondent.`
                res.json({message, data: rows})
            })
            .catch(err => {
                const message = `La liste des typetubes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: err})
            })
        }


        //findAll standard : 
        TypeTube.findAll()
        .then(typetubes => {
            const message = 'La liste des types de tube a bien été récupérée.'
            res.json({ message, data: typetubes })
        })
        .catch(err => {
            const message = `La liste des types de tube n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}