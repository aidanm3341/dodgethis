var path          = require('path');
var electron      = require('electron');
var app           = electron.app;
var BrowserWindow = electron.BrowserWindow;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
app.on('ready', function onReady() {
	var width = 512;
	var height = 512;
	var fullscreenable = false;

	var url = 'file://' + path.join(__dirname, 'app/index.html');

	var options = {
		width: width,
		height: height,
		minWidth: width,
		minHeight: height,
		frame: true,
		fullscreenable: fullscreenable,
		webPreferences: {
			devTools: false,
			nodeIntegration: true,
			webSecurity: true
		}
	};

	var win = new BrowserWindow(options);
	win.setMenu(null);

	var rect = win.getContentBounds();
	win.setContentBounds({ x: rect.x, y: rect.y, width: width, height: height });

	win.loadURL(url);
});

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
app.on('window-all-closed', function () {
	app.quit();
});
