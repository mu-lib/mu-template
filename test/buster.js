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
		"fixtures/require.js",
		"bower_components/requirejs/require.js"
	],

	"resources": [
		"fixtures/**/*.*",
		"bower_components/requirejs/require.js",
		"bower_components/requirejs-text/text.js",
		"main.js",
		"requirejs.js"
	],

	"tests": [
		"test/**/*-browser.js"
	]
};