'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed',function(){
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready',function() {

	mainWindow = new BrowserWindow({
		width: 1600,
		height: 900,
		center:true
	});
	mainWindow.loadUrl('file://' + __dirname + '/app/html/main_app.html');

	mainWindow.on('closed',function() {
		mainWindow = null;
	})

});