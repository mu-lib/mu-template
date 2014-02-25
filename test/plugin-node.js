"use strict";
var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("plugin", function (run) {
	var fs = require("fs");
	var temp = require("temp");
	var requirejs = require("requirejs");

	run({
		"setUp": function () {
			this.timeout = 1000;
		},

		"load test.html": function (done) {
			requirejs.config({
				"baseUrl": "./",
				"packages": [{
					"name" : "text",
					"location": "bower_components/requirejs-text",
					"main": "text"
				}],
				"deps" : [ "plugin!fixtures/test.html" ],
				"callback": function (data) {

					assert.equals(data({ "test" : 123 }), "THIS IS A [123] TEST");

					done(true);
				}
			}, done);
		},

		"load empty:": function (done) {
			requirejs.config({
				"baseUrl": "./",
				"packages": [{
					"name" : "text",
					"location": "bower_components/requirejs-text",
					"main": "text"
				}],
				"deps" : [ "plugin!empty:" ],
				"callback": function (data) {

					refute.defined(data);

					done(true);
				}
			}, done);
		},

		"write test.html": function (done) {
			temp.open("requirejs", function (err, info) {
				if (err) {
					done(err);
				}

				requirejs.optimize({
					"optimize": "none",
					"packages": [{
						"name" : "text",
						"location": "bower_components/requirejs-text",
						"main": "text"
					}],
					"out": info.path,
					"name": "plugin!fixtures/test.html",
					"exclude": [ "plugin" ]
				}, function (output) {
					fs.readFile(info.path, {
						"encoding": "utf8"
					}, function (err, data) {
						if (err) {
							done(err);
						}

						assert.equals(data, "\n\
define('plugin!fixtures/test.html',[],function () {return function anonymous(data) {\n\
var o = \"THIS IS A [\" + ( data.test ) + \"] TEST\"; return o;\n\
}});\
");

						done(true);
					});
				});
			});
		},

		"write empty:": function (done) {
			temp.open("requirejs", function (err, info) {
				if (err) {
					done(err);
				}

				requirejs.optimize({
					"optimize": "none",
					"packages": [{
						"name" : "text",
						"location": "bower_components/requirejs-text",
						"main": "text"
					}],
					"out": info.path,
					"name": "plugin!empty:",
					"exclude": [ "plugin" ]
				}, function (output) {
					fs.readFile(info.path, {
						"encoding": "utf8"
					}, function (err, data) {
						if (err) {
							done(err);
						}

						assert.equals(data, "");

						done(true);
					});
				});
			});
		}
	});
});
