var exec = require('cordova/exec');


function paymentAction (action) {
  return function (arg0, success, error) {
    var argsArray =  (Array.isArray(arg0)) ? arg0 : [arg0];
    
    if(success) {
      exec(success, error, "PaymentPlugin", action, argsArray);
    } else {
      exec(function(response) {}, error, "PaymentPlugin", action, argsArray);
    }
  }
}

var PaymentPlugin = {};
PaymentPlugin.SAFE_TOKEN_RESPONSE_CODE = "T0";
PaymentPlugin.CARDINAL_RESPONSE_CODE = "S0";
PaymentPlugin.init = paymentAction("Init");

// Using Payment SDK UI
PaymentPlugin.pay = paymentAction("Pay");
PaymentPlugin.payWithCard = paymentAction("PayWithCard");

// Without using Payment SDK UI
// PaymentPlugin.makePayment = paymentAction("MakePayment");


module.exports = PaymentPlugin;
