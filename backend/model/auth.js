const getDb = require('../database').getDb;

class Auth {
    static save(data, cb){
        const db = getDb();
        db.collection('auth').insertOne(data, (err, result) => {
            if(err){
                throw new Error(err)
            }
            cb(result);
        })
    }

    static authenticate(data, cb){
        const db = getDb();
        db.collection('auth').findOne({email:data.email}, (err, result) => {
            if(err){
                throw new Error(err)
            }
            cb(result);

        })

    }
};


module.exports = Auth;