/**
 * µTemplate amd plugin loader
 * @license MIT http://mikael.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define([ "text", "./main" ], function (text, compiler) {
	"use strict";

	var UNDEFINED;
	var EMPTY = /^empty:/;
	var buildMap = {};

	return {
		"load": function (name, req, load, config) {
			var url = req.toUrl(name);

			if (EMPTY.test(url)) {
				load(UNDEFINED);
			}
			else {
				text.get(url, function (source) {
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
				write.asModule(pluginName + "!" + moduleName, "define(function () {return "  + buildMap[moduleName].toString() + "});");
			}
		}
	};
});