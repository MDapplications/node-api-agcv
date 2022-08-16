const { Stock } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/stocks/:id', auth, (req, res) => {
        Stock.findByPk(req.params.id)
        .then(stock => {
            //gestion de l'erreur 404
            if(stock === null) {
                const message = `Le stock demandé n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Un stock a bien été trouvé.'
            res.json({ message, data: stock })
        })
        .catch(err => {
            const message = `Le stock n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}