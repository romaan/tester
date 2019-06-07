var http = require('http');
var express = require('express');
var RED = require('node-red');
var path = require('path');
var fs = require('fs');

 // Create an Express app
var app = express();

// Get current root folder
global.appRoot = path.resolve(__dirname);

// Add a simple route for static content served from 'public'
app.use("/public", express.static("www"));

// Create a server
var server = http.createServer(app);


var settings = {
	httpAdminRoot:"/",
	httpNodeRoot: "/",
	userDir: ".nodered/",
    flowFilePretty: true,
	flowFile: appRoot + '/flows.json',
	functionGlobalContext :{
		TILLIT_HOST: process.env.TILLIT_HOST || "https://demo.gotillit.com",
		TENANT_ID: "11"
	}
};


RED.init(server, settings);
// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Server the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);
server.listen(80);
// Start the runtime
RED.start();

module.exports = app;

