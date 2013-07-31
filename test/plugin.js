var fs = require("fs");
var temp = require("temp");
var requirejs = require("requirejs");

var buster = require("buster");
var assert = buster.assertions.assert;

buster.testCase("plugin", {
	"load": function (done) {
		requirejs.config({
			"baseUrl": "./",
			"packages": [{
				"name" : "text",
				"location": "bower_components/text",
				"main": "text"
			}],
			"deps" : [ "fixtures/test" ],
			"callback": function (data) {
				assert.equals(data, "THIS IS A [123] TEST");
				done(true);
			}
		}, function (err) {
			done(err);
		});
	},

	"write": function (done) {
		temp.open("requirejs", function (err, info) {
			if (err) {
				done(err);
			}

			requirejs.optimize({
				"optimize": "none",
				"packages": [{
					"name" : "text",
					"location": "bower_components/text",
					"main": "text"
				}],
				"out": info.path,
				"name": "fixtures/test",
				"exclude": [ "plugin" ]
			}, function (output) {
				fs.readFile(info.path, {
					"encoding": "utf8"
				}, function (err, data) {
					if (err) {
						done(err);
					}

					assert.equals(data, "\n\
define('plugin!fixtures/test.html', function () { return '\
function anonymous(data) {\n\
var o = \"THIS IS A [\" + data.test + \"] TEST\"; return o;\n\
}';});\n\
\n\
define('fixtures/test',[\"plugin!./test.html\"], function (template) {\n\
	return template({\"test\": 123});\n\
});");
					done(true);
				});
			});
		});
	}
});