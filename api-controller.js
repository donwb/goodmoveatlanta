var MongoClient = require('mongodb').MongoClient;
var connectString;

var ApiController = function (cs) {
    connectString = cs;
}

ApiController.prototype.addSeller = function(sellerInfo, callback){
    MongoClient.connect(connectString, function(err, db) {
    
        var sellerCollection = db.collection('seller');
        sellerCollection.insert(sellerInfo, function(err, result){
            db.close();
            callback(err, result);

        });    
    });
}


ApiController.prototype.addBuyer = function(buyerInfo, callback){
    MongoClient.connect(connectString, function(err, db) {
    
        var buyerCollection = db.collection('buyer');
        buyerCollection.insert(buyerInfo, function(err, result){
            db.close();
            callback(err, result);

        });    
    });
}


module.exports = ApiController;