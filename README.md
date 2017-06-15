# Table of Contents
1. [Cordova Payment Plugin](#CordovaPayment)

2. [First steps](#FirstSteps)

3. [Install instructions for iOS](#InstallationInstructionsForIos)

4. [Using The Plugin in Sandbox Mode](#SandBoxMode)

5. [Using the Plugin with UI (In PCI-DSS Scope: No )](#SDKWithUI)
   * [Pay with Card/Wallet](#Pay)
   * [Pay with Card](#PayWithCard)

6. [Example](#Example)


  

## <a name='CordovaPayment'></a> Cordova Payment Plugin
Interswitch cordova payment plugin allows you to accept payments from customers within your cordova mobile application.

**Please Note: *The current supported currency is naira (NGN), support for other currencies would be added later***

The first step to ​using the plugin is to register as a merchant. This is described [here] (merchantxuat.interswitchng.com)

## <a name='FirstSteps'></a> First steps
* Create a new cordova project. To do so refer to the documentation [here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)


## <a name='InstallationInstructionsForIos'></a>Plugin installation instructions for iOS
* You'll need to have **Xcode 8.3.2** or later installed.

* **cd** to the directory of your cordova project. 

* Add cordova payment plugin
```
cordova plugin add https://github.com/tobzy/cordova-plugin.git
```

* Add ```ios``` platform. Make sure to add the platform **after** adding the plugin.

```terminal
sudo cordova platform add ios
```

* In ```Finder```, go to the **YourCordovaApp/platforms/ios** directory. Open the .xcodeproj file in XCode. A dialog may appear asking: Convert to latest Swift Syntax? Click the **Cancel** button.

* In ```Finder```, go to the ```/platforms/ios/<NameOfApp>/Plugins/com.interswitchng.sdk.payment``` directory. You should see a **PaymentSDK.framework** file.

* Drag the ​ **PaymentSDK.framework** file from ```Finder``` to XCode's **Embedded Binaries** section for your app's **TARGETS** settings. This will be found under the ```General``` tab.

* In the dialog that appears, make sure ```Copy items if needed``` is unchecked.

* **Important**: With ```XCode``` still open, click the project to view its settings. Under the **info** tab find the **Configurations** section and change all the values for ```Debug``` and ```Release``` to **None**. You can change it back once our setups are done.

The **PaymentSDK.framework** needs some [Cocoapods](https://cocoapods.org/) dependencies so we'll need to install them.

* Close Xcode. **cd** into ```platforms/ios``` directory

* Run: 

```terminal
pod init
```

* Open the **Podfile** created and replace ```#``` commented parts with the following.

```terminal
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, "8.0"
use_frameworks!
```

* Check the target block, if the line ```use_frameworks``` is there, please remove it since the line already exists.
* Add the following to the **Podfile**, inside the first ```target``` block.

```
pod 'CryptoSwift', '0.6.9'
pod 'Alamofire', :git => 'https://github.com/Alamofire/Alamofire.git', :tag => '4.4.0'
pod 'SwiftyJSON', :git => 'https://github.com/SwiftyJSON/SwiftyJSON.git', :tag => '3.1.4'
pod 'OpenSSL-Universal', '1.0.2.10'
```

* Now run:

```terminal
pod install
```

* After the pods are installed successfully you can go to the directory ```platforms/ios``` and open the ```<NameOfApp>.xcworkspace``` file in XCode.

* . Important: With XCode still open, click the project to view its settings. Under the ```Build Settings``` tab find the Architectures section and change the value for ```Build Active Architecture Only``` to No. Do the same for the target settings.

* Next, click on ```CordovaLib.xcodeproj``` to view its settings. Under the ```Build Settings``` tab find the Architectures section and change the value for ```Build Active Architecture Only``` to No. Do the same for the target settings.

* Next, click on ```Pods``` to view its settings. Under the ```Build Settings``` tab find the Architectures section and change the value for ```Build Active Architecture Only``` to No. Do the same for the target settings.


### <a name='SandBoxMode'></a> Using The Plugin in Sandbox Mode

During development of your app, you should use the Plugin in sandbox mode to enable testing. Different Client Id and Client Secret are provided for Production and Sandbox mode. The procedure to use the Plugin on sandbox mode is just as easy:

* Use Sandbox Client Id and Client Secret got from the Sandbox Tab of the Developer Console after signup (usually you have to wait for 5 minutes after signup for you to see the Sandbox details) everywhere you are required to supply Client Id and Client Secret in the remainder of this documentation              
* In your code, override the api base as follows

```javascript
    function init(){
        var userDetails = {
            clientId: "IKIAF8F70479A6902D4BFF4E443EBF15D1D6CB19E232",
            clientSecret: "ugsmiXPXOOvks9MR7+IFHSQSdk8ZzvwQMGvd0GJva30=",
            paymentApi : "https://sandbox.interswitchng.com",
            passportApi : "https://sandbox.interswitchng.com/passport"
        };
        var initial = PaymentPlugin.init(userDetails);
    }
```

* Follow the remaining steps in the documentation.
* call the init function inside the onDeviceReady function of your cordova app  (VERY IMPORTANT!)
* NOTE: When going into Production mode, use the Client Id and the Client Secret got from the Production Tab of Developer Console instead.

## <a name='SDKWithUI'></a>Using the Plugin with UI (In PCI-DSS Scope: No )

### <a name='Pay'></a>Pay with Card/Wallet

* To allow for Payment with Card or Wallet
* Create a Pay button
* In the onclick event of the Pay button, use this code
1. Set up payment request like this: 

```javascript
    var payRequest = {			
        amount : 100, // Amount in Naira
        customerId : 1234567890, // Optional email, mobile no, BVN etc to uniquely identify the customer.
        currency : "NGN", // ISO Currency code
        description : "Purchase Phone" // Description of product to purchase
    }
```

2. Create a button to make payment and use this code in the onclick event of the button

```javascript
    var paySuccess = function(response) {
        var purchaseResponse = JSON.parse(response); // transaction success reponse
        alert(purchaseResponse.message); 
    }
    var payFail = function(response) {
        alert(response); // transaction failure reponse
    }
    PaymentPlugin.pay(payRequest, paySuccess, payFail);
```

### <a name='PayWithCard'></a>Pay with Card

* To allow for Payment with Card only
* Create a Pay button and set the payment request
*Set up payment request like this: 
```javascript
    var payWithCardRequest = {			
        amount : 100, // Amount in Naira
        customerId : 1234567890, // Optional email, mobile no, BVN etc to uniquely identify the customer.
        currency : "NGN", // ISO Currency code
        description : "Purchase Phone" // Description of product to purchase
    }
```

* In the onclick event of the Pay button, use this code.

```javascript
  var payWithCardSuccess = function(response) {
    var purchaseResponse = JSON.parse(response); // transaction success reponse
    alert(purchaseResponse.message);
  }
  var payWithCardFail = function(response) {
    alert(response); // transaction failure reponse
  }
  PaymentPlugin.payWithCard(payWithCardRequest, payWithCardSuccess, payWithCardFail);
```

### <a name='Example'></a>Example

```javascript
onDeviceReady: function() {
        this.receivedEvent('deviceready');

        //the init function with client parameters
        function init() {
            var userDetails = {
                clientId: "IKIA7B379B0114CA57FAF8E19F5JKSD83ED2220057EF",
                clientSecret: "MiunSQ5S/N219UCVP3432raPfwK9lMoiV/Pwertv/R4=",
                paymentApi: "https://qa.interswitchng.com",
                passportApi: "https://qa.interswitchng.com/passport"
            };

            var initial = PaymentPlugin.init(userDetails);
        }
        var payWithCard = function() {
            var payWithCardRequest = {
                amount: "20", // Amount in Naira
                customerId: "1234567890", // Optional email, mobile no, BVN etc to uniquely identify the customer.
                currency: "NGN", // ISO Currency code
                description: "Purchase Phone" // Description of product to purchase
            };
            var payWithCardSuccess = function(response) {
                var purchaseResponse = JSON.parse(response);

                alert(purchaseResponse.message);
            }
            var payWithCardFail = function(response) {
                alert(response);
            }
            PaymentPlugin.payWithCard(payWithCardRequest, payWithCardSuccess, payWithCardFail);
        }

        init();


         //Event listener to call the payWithCard function when the button is clicked.

        document.getElementById('payButton').addEventListener('click', function() {
            payWithCard();
        })
    },



```