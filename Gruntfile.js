/*
 * µTemplate
 * https://github.com/mikaelkaron/mu-template
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var UNDEFINED;

	grunt.initConfig({
		"pkg" : grunt.file.readJSON("package.json"),

		"build" : {
			"src" : ".",
			"dist" : "dist",
			"banner" : "/**\n" +
				" * <%= pkg.name %> - <%= pkg.version %>\n" +
				" * @license <%= pkg.licenses[0].type %> <%= pkg.licenses[0].url %> © <%= pkg.author.name %> mailto:<%= pkg.author.email%>\n" +
				" */"
		},

		"jshint": {
			"all": [
				"Gruntfile.js",
				"main.js"
			],
			"options": {
				"jshintrc": ".jshintrc"
			}
		},

		"clean" : [ "<%= build.dist %>"],

		"copy" : {
			"all" : {
				"files" : [{
					"expand" : true,
					"cwd" : "<%= build.src %>",
					"dest" : "<%= build.dist %>",
					"src" : [ "bower.json", "package.json", "main.js", "plugin.js" ]
				}]
			}
		},

		"git-describe" : {
			"all" : {
				"options" : {
					"prop" : "pkg.version"
				}
			}
		},

		"json-replace" : {
			"options" : {
				"space" : "\t"
			},
			"package.json" : {
				"options" : {
					"replace" : {
						"version" : "<%= pkg.version %>",
						"devDependencies" : UNDEFINED
					}
				},
				"files" : {
					"<%= build.dist %>/package.json" : "<%= build.dist %>/package.json"
				}
			},
			"bower.json" : {
				"options" : {
					"replace" : {
						"version" : "<%= pkg.version %>"
					}
				},
				"files" : {
					"<%= build.dist %>/bower.json" : "<%= build.dist %>/bower.json"
				}
			}
		},

		"git-dist" : {
			"all" : {
				"options" : {
					"branch" : "dist",
					"dir" : "<%= build.dist %>",
					"message" : "<%= pkg.name %> - <%= pkg.version %>",
					"config" : {
						"user.name" : UNDEFINED,
						"user.email" : UNDEFINED
					}
				}
			}
		},

		"buster" : {
			"all": {}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-git-describe");
	grunt.loadNpmTasks("grunt-git-dist");
	grunt.loadNpmTasks("grunt-json-replace");
	grunt.loadNpmTasks("grunt-buster");
	grunt.registerTask("test", [ "buster" ]);
	grunt.registerTask("dist", [ "clean", "git-dist:*:clone", "copy", "git-describe", "json-replace", "git-dist:*:commit", "git-dist:*:push" ]);
};
