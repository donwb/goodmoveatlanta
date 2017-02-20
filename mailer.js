var mailgun = require('mailgun-js')({
    apiKey: process.env.MG_API,
    domain: process.env.MG_DOMAIN});


var fromAccount

var Mailer = function(from){
    fromAccount = from;
}

Mailer.prototype.send = function(mail, callback) {
    //console.log('sending mail: ' + mail.text);

    mail.from = fromAccount;

    mailgun.messages().send(mail, function(err, body){
        console.log(body);
        callback();
    });
}

module.exports = Mailer;