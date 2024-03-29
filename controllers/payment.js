var braintree = require("braintree");

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'vqz2djhr3kskxdr5',
    publicKey:    'jmnpjb4wn7knvn2n',
    privateKey:   '2f913737cca737bd33ee2c0daebe1f52'
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
       if (err) {
           res.status(500).json(err);
       }else{
           res.json(response);
       }
      });

      
}


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if (err) {
              res.status(500).json(err)
          }else{
              res.json(result);
          }
      });
}