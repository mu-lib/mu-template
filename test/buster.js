var config = module.exports;


config["node"] = {
	"environment": "node",

	"rootPath": "../",

	"tests": [
		"test/**/*-node.js"
	]
};

config["browser"] = {
	"environment": "browser",

	"rootPath": "../",

	"libs": [
		"test/require.js",
		"bower_components/requirejs/require.js"
	],

	"resources": [
		"fixtures/**/*.*",
		"bower_components/requirejs/require.js",
		"bower_components/text/text.js",
		"main.js",
		"plugin.js"
	],

	"tests": [
		"test/**/*-browser.js"
	]
};