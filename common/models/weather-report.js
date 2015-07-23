module.exports = function(WeatherReport) {
	WeatherReport.handleChangeError = function(err) {
    console.warn('Cannot update change records for Todo:', err);
  };
};
