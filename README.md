# ace-api

## Intro and Overview
This is the server-side API compliment to the ace-cordova-app project (https://github.com/ua-snap/ace-cordova-app).  It 
was developed using [Loopback](https://loopback.io).  It is currently configured to be deployed via Heroku (Procfile) 
and be connected to a MongoDb database.  

## Code Structure
###### Server API Code
The Loopback base for this API allows it to be easily modified and extended to meet any organization's requirements.  All
data models are defined in the [common/models/](https://github.com/ua-snap/ace-api/tree/master/common/models) directory.
Any changes can be made here or using the [Loopback command line utility](https://docs.strongloop.com/display/NODE/Command-line+reference).
All server configuration is done in the [server/](https://github.com/ua-snap/ace-api/tree/master/server) directory.  Boot
scripts, including data setup scripts can be found at [server/boot/](https://github.com/ua-snap/ace-api/tree/master/server/boot).

###### Loopback sync client code
The [client/lbclient](https://github.com/ua-snap/ace-api/tree/master/client/lbclient) directory contains all the JavaScript
code for the Loopback synchronization library.  After configuring the client library to match the models in the server
code, the bundled library can be generated via grunt: "grunt build-lbclient".  That file, along with the lbclient.js file,
allow Loopback to be run in a browser.  (Example app: https://github.com/strongloop/loopback-example-offline-sync, 
documentation: https://docs.strongloop.com/display/public/LB/Synchronization)