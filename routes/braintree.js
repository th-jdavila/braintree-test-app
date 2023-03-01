var express = require('express');
var router = express.Router();

var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "tv6vwvpd3wwd648k",
  publicKey: "9rfvv9q6jnw8h4pn",
  privateKey: "e2ac69057e4f9eb1e79fce628cbedbab",
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/client_token", (req, res) => {
  // Creates a new client token for the front-end
  gateway.clientToken.generate({}, (err, response) => {
    res.send(response.clientToken);
  });
});

router.post("/checkout", (req, res) => {
  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
