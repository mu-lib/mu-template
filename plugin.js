/**
 * µTemplate amd plugin loader loader
 * @license MIT http://mikael.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define([ "text", "./main" ], function (text, compiler) {
	"use strict";

	return {
		"load": function (name, req, load) {
			text.get(req.toUrl(name), function (value) {
				load.fromText(name, compiler(value));
			});
		}
	};
});