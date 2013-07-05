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
		}
	});

	grunt.loadTasks("tasks");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.registerTask("default", [ "jshint" ]);
};
