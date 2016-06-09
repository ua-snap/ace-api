var async = require('async');

module.exports = function(Weatherreport) {
	Weatherreport.handleChangeError = function(err) {
		console.warn("Cannot update change records for WeatherReport: ", err);	
	};

	Weatherreport.aaep = function(days, cb) {
		// LoopBack currently seems not to support filtering parent results
		// based on attributes of their children. So this code does that manually.
		Weatherreport.find({
			where: {aaep: true},
			include: {
				relation: 'Position'
			}
		}, function(err, results) {
			if(days === undefined) {
				cb(null, results);
			} else {
				var d = new Date();
				d.setDate(d.getDate() - days);
				var filteredResults = [];

				async.each(results, function (result, callback) {
					// Need to wait until each result's Position promise resolves
					// before the Position's timestamp attribute can be checked.
					result.Position.getAsync()
					.then(function (position) {
						if(position.timestamp > d) {
							filteredResults.push(result);
						}
						callback();
					});
				}, function () {
					cb(null, filteredResults);
				});
			}
		});
	};

	Weatherreport.remoteMethod('aaep', {
		http: {path: '/aaep', verb: 'get'},
		accepts: {arg: 'days', type: 'number', http: { source: 'query'}},
		returns: {arg: 'WeatherReports', type: 'string'}
	});
};
