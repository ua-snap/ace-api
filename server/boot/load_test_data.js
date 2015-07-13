module.exports = function(app) {
	// Create group
	app.models.group.create([{name: "Group1"}]);
	app.models.group.create([{name: "Group2"}]);
	
	app.models.mobile_user.create([
		{username: "appuser", email: "test@test.com", password:"password", groupId: 1},
		{username: "appuser2", email: "test2@test.com", password:"password2", groupId: 1},
		{username: "appuser3", email: "test3@test.com", password:"password3", groupId: 2}
	]);
	
	app.models.Storage.createContainer({name: "mobile_uploads"}, function() {});
	
	/*app.models.position.create([
		{userId: 1, latlng: {lat:32.602351, lng:-85.489553}, timestamp: new Date()}
	], function(err, positions) {
		var posId = positions[0].id;
		app.models.weather_report.create([
			{userId: 1, positionId: posId, cloudCover: "1/8th"}
		]);
	});*/
	
};