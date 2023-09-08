const knex = require('../../database/banco');

module.exports = {
    
    async raiz(req, res){
        try{
            return res.send('Raíz das notificações');
        }
        catch (error) {
            return res.status(500).json({error: error.message});
        }
    },
}