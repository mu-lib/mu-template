/**
 * µTemplate
 * @license MIT http://mikael.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
(function (define) { define(function () {
	"use strict";

	var EMPTY = "";
	var REPLACE = {
		"\"" : "\\\"",
		"\n" : "\\n",
		"\t" : "\\t",
		"\r" : "\\r"
	};

	/**
	 * Compiles template
	 *
	 * @param {String} body Template body
	 * @returns {String}
	 */
	return function (body) {
		var re_sanitize = /^[\n\t\r]+|[\n\t\r]+$/g;
		var re_blocks = /<%(=)?([\S\s]*?)%>/g;
		var re_tokens = /<%(\d+)%>/gm;
		var re_replace = /(["\n\t\r])/gm;
		var re_clean = /o \+= "";| \+ ""/gm;
		var blocks = [];
		var length = 0;

		function blocksTokens(original, prefix, block) {
			blocks[length] = prefix
				? "\" + (" + block + ") + \""
				: "\";" + block + "o += \"";
			return "<%" + String(length++) + "%>";
		}

		function tokensBlocks(original, token) {
			return blocks[token];
		}

		function replace(original, token) {
			return REPLACE[token] || token;
		}

		body = ("var o = \""
			// Sanitize body before we start templating
			+ body.replace(re_sanitize, "")

			// Replace script blocks with tokens
			.replace(re_blocks, blocksTokens)

			// Replace unwanted tokens
			.replace(re_replace, replace)

			// Replace tokens with script blocks
			.replace(re_tokens, tokensBlocks)

			+ "\"; return o;")

			// Clean
			.replace(re_clean, EMPTY);

		// Return compiled template
		return Function("data", body);
	};
}); })(typeof define === "function" && define.amd ? define : function (factory) { module.exports = factory(); });
