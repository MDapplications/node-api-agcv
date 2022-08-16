const { Saison, ConsoVolant, Commande, Competition, Stock, Restock, TypeTube} = require('../../db/sequelize')
const auth = require('../../auth/auth')


module.exports = (app) => {
    app.get('/api/saisons/:id', auth, (req, res) => {
        Saison.findByPk(req.params.id, {include: [
            {model: ConsoVolant, include: [
                {model: ConsoMois, include: [PrixTube, Commande]},
                {model: TypeTube}]},
            {model: Commande, include: [Membre, PrixTube, ConsoMois]},
            {model: Stock, include: [
                {model: Competition, include: TypeTube},
                {model: Restock, include: TypeTube},
                {model: TypeTube}
            ]}
        ]})
        .then(saison => {
            //gestion de l'erreur 404
            if(saison === null) {
                const message = `La saison demandée n'existe pas. Réessayez avec un autre id.`
                return res.status(404).json({message})
            }
            //ressource presente - status : 200
            const message = 'Une saison a bien été trouvé.'
            res.json({ message, data: saison })
        })
        .catch(err => {
            const message = `La saison n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: err})
        })
    })
}