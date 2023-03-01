# braintree-test-app

npm install && npm start

Docs:

https://developer.paypal.com/braintree/docs/start/overview

Important endpoints:

http://localhost:3000/braintree/client_token -> To receive the initialization token needed by Drop-in UI plugin
http://localhost:3000/braintree/checkout -> The api that should be configured to use by the Drop-in UI plugin once the form has been submitted correctly.
