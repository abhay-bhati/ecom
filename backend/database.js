const mongoDb = require('mongodb');
const mongoClient = mongoDb.MongoClient;
let _db

const mongoConnect = (cb) => {
mongoClient.connect('mongodb+srv://abhay:Bangarang@cluster0.5ei76.mongodb.net/ECom?retryWrites=true&w=majority')
.then(client => {
    _db = client.db();
    cb(client);
})
}

const getDb = () => {
    if(_db){
        return _db
    }
    else{
        return _db
    }
}


exports.server = mongoConnect;
exports.getDb = getDb;