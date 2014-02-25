buster.testCase("plugin", function (run){
	"use strict";

	var assert = buster.referee.assert;
	var refute = buster.referee.refute;

	run({
		"setUp": function () {
			this.timeout = 1000;
		},

		"load test.html": function (done) {
			require([ "plugin!fixtures/test.html" ], function (data) {
				assert.equals(data({ "test" : 123 }), "THIS IS A [123] TEST");

				done(true);
			}, done);
		},
		"load expression.html": function (done) {
			require([ "plugin!fixtures/expression.html" ], function (data) {
				assert.equals(data({"checked": true }), "foo checked bar");

				done(true);
			}, done);
		},
		"load empty:": function (done) {
			require([ "plugin!empty:" ], function (data) {
				refute.defined(data);

				done(true);
			}, done);
		}
	});
});
