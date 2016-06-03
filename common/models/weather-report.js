module.exports = function(Weatherreport) {
	Weatherreport.handleChangeError = function(err) {
		console.warn("Cannot update change records for WeatherReport: ", err);	
	};

	Weatherreport.withPositions = function(WeatherreportId, cb) {
		Weatherreport.find({include: 'Position'}, function(err, results) {
			cb(null, results);
		}
	}

	Weatherreport.remoteMethod('withPositions', {
	    http: {path: '/with-positions', verb: 'get'},
	    accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
	    returns: {arg: 'WeatherReports', type: 'string'}
	});
};
