module.exports = function(MobileUser) {
	// Hide internal "position" relationship API endpoints
	MobileUser.disableRemoteMethod('__count__position', false);
	MobileUser.disableRemoteMethod('__create__position', false);
	MobileUser.disableRemoteMethod('__delete__position', false);
	MobileUser.disableRemoteMethod('__destroyById__position', false);
	MobileUser.disableRemoteMethod('__findById__position', false);
	MobileUser.disableRemoteMethod('__get__position', false);
	MobileUser.disableRemoteMethod('__updateById__position', false);	
	
	// Hide internal "weather_report" relationship API endpoints
	MobileUser.disableRemoteMethod('__count__weather_report', false);
	MobileUser.disableRemoteMethod('__create__weather_report', false);
	MobileUser.disableRemoteMethod('__delete__weather_report', false);
	MobileUser.disableRemoteMethod('__destroyById__weather_report', false);
	MobileUser.disableRemoteMethod('__findById__weather_report', false);
	MobileUser.disableRemoteMethod('__get__weather_report', false);
	MobileUser.disableRemoteMethod('__updateById__weather_report', false);	
};
