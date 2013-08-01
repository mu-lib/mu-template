/**
 * µTemplate amd plugin loader
 * @license MIT http://mikael.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define([ "text", "./main" ], function (text, compiler) {
	"use strict";

	var UNDEFINED;
	var buildMap = {};

	return {
		"load": function (name, req, load, config) {
			if (name === "empty:") {
				load(UNDEFINED);
			}
			else {
				text.get(req.toUrl(name), function (source) {
					var compiled = compiler(source);

					if (config.isBuild) {
						buildMap[name] = compiled;
					}

					load(compiled);
				}, load.error);
			}
		},

		"write": function (pluginName, moduleName, write) {
			if (moduleName in buildMap) {
				write("define('" + pluginName + "!" + moduleName  + "', function () { return '" + buildMap[moduleName].toString() + "';});\n");
			}
		}
	};
});