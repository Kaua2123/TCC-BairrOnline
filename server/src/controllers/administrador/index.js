const knex = require('../../database/banco');


module.exports = {
    async raiz(req, res){
        try {
            return res.send('página raíz');
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
}