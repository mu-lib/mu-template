/*
 * µTemplate
 * https://github.com/mikaelkaron/mu-template
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		"jshint": {
			"all": [
				"Gruntfile.js",
				"main.js"
			],
			"options": {
				"jshintrc": ".jshintrc"
			}
		},

		"buster" : {
			"all": {}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-buster");
	grunt.registerTask("test", [ "buster" ]);
	grunt.registerTask("default", [ "jshint", "test" ]);
};
