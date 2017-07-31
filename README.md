# Mindwave Scratch Extension

An experimental Scratch extension for Neurosky Mindwave Mobile headset

The core of the extension is a node.js application "http-app.js" that reads data from thinkgear connector socket and provides them to the scratch extension using a local http server.

The project is still in "alpha" and making it works is not an easy process, I will semplify this in the future, anyway here are step-by-step instructions.

1. buy a neurosky mindwave and install their software, including ThinkgearConnector
2. connect the headset via bluetooth and make sure it is working, for example using BrainwaveVisualizer app
3. download from github the following files: extension.json, http-app.js

4. import extension.json in Scratch

To import them you need to:
- open Scratch Offline Editor
- shift+click on File in the top menu (mouse click while holding the shift key pressed)
- select "Import Experimental HTTP Extension"
- select extension.json
- make sure that attention, meditation and blink variables are available in the "more blocks" area

5. launch http-app.js from command line using node

To launch it you need to:
- install node.js
- express module is already included, in case it is missing install it from command line: "npm install express"
- go the the folder where http-app.js is and run from command line: "node http-app.js"
- if the app connects to thinkgear correctly, meditation and blink values should be shown in the log

At this point you should see the values also on Scratch and you can use them as you want.
In case of problems try to restart the app / reload the extension / reconnect mindwave.
