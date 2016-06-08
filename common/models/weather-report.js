module.exports = function(Weatherreport) {
	Weatherreport.handleChangeError = function(err) {
		console.warn("Cannot update change records for WeatherReport: ", err);	
	};

	Weatherreport.withPositions = function(cb) {
		Weatherreport.find({
			where: {'aaep': true},
			include: {
				relation: 'Position'
			}
		}, function(err, results) {
			cb(null, results);
		});
	};

	Weatherreport.remoteMethod('withPositions', {
		http: {path: '/aaep', verb: 'get'},
		returns: {arg: 'WeatherReports', type: 'string'}
	});
};
