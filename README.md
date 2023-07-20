Steps to run and build the app.
Install node js .. (App is successfully running on version 16.16.0)
Open Root folder in cmd and run command *npm install* to install dependencies.
Run command *npm start* to run the app.
Scan  the QR code in the Expo Go mobile App. (Download from playstore)

--For keystroke:
On Windows keytool must be run from C:\Program Files\Java\jdkx.x.x_x\bin, as administrator.

keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
Give all information that needed in following command 


Following are commands to build the apk
-First of all  run  sign up in eas (Expo Application Service )
and run the following command in Root Folder 
-eas login 
-Enter your signup account information
-Then it ask you to overwrite you may allow it.
-Then run eas build:configure (Select Android platform)
-Then run eas build --platform android
-And wait untill build is complete
-Copy the http link and paste in google chrome
-Download the aab file from above right corner option 
-Make a directory in your computer directory and paste downloaded aab file 
-Rename your downloaded aab file with MyApp  //This is optional

-Open Root folder in cmd and run command  *java -jar bundletool.jar build-apks --bundle="MyApp.aab" --output="ClusterRoutes.apks" --ks="C:\Program Files\Java\jdkx.x.x_x\my-upload-key.keystore" --ks-key-alias=my-key-alias --ks-pass=pass:"Pasword that you set of keystroke file " --key-pass=pass:"Pasword that you set to keystroke file "*
-Then run same command on same Root folder *java -jar bundletool.jar build-apks --bundle=MyApp.aab --output=myapp2.apks --mode=universal --ks="C:\Program Files\Java\jdkx.x.x_x\my-upload-key.keystore" --ks-key-alias=my-key-alias --ks-pass=pass:Pasword that you set of keystroke file --key-pass=pass:Pasword that you set of keystroke file *
-Rename myapk2.apks with "myapk2.zip" and open it then it contain universal apk file fetch it from there and add in your folder 
-This is apk that you want

If you have any query or issue then contact me I can help you in installing by connecting with AnyDesk
Thankyou