var MongoClient = require('mongodb').MongoClient;
var mailer = require('./mailer');

var connectString;

var ApiController = function (cs) {
    connectString = cs;
}

ApiController.prototype.addSeller = function(sellerInfo, callback){
    MongoClient.connect(connectString, function(err, db) {
    
        var sellerCollection = db.collection('seller');
        sellerCollection.insert(sellerInfo, function(err, result){
            db.close();

            var m = new mailer('don@mariettahometeam.com');
            var mailInfo = {
                to: 'don@mariettahometeam.com',
                subject: 'New Seller Submission',
                text: 'New Seller submitted'
            }
            m.send(mailInfo, function(){
                callback(err, result);
            });
        });    
    });
}


ApiController.prototype.addBuyer = function(buyerInfo, callback){
    MongoClient.connect(connectString, function(err, db) {
    
        var buyerCollection = db.collection('buyer');
        buyerCollection.insert(buyerInfo, function(err, result){
            db.close();

            var m = new mailer('don@mariettahometeam.com');
            var mailInfo = {
                to: 'don@mariettahometeam.com',
                subject: 'New Buyer Submission',
                text: 'New Buyer submitted'
            };
            m.send(mailInfo, function(){
                callback(err, result);
            });
        });    
    });
}


module.exports = ApiController;