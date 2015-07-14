// Automigrates all data models
module.exports = function(app) {
	// 	Groups
	app.dataSources.postgresql_heroku.automigrate('group', function(err) {
		if (err) throw err;
		
		app.models.group.create([{name: "Group1"}]);
		app.models.group.create([{name: "Group2"}]);
	});
	
	// Mobile Users
	app.dataSources.postgresql_heroku.automigrate('mobile_user', function(err) {
		if (err) throw err;
		
		app.models.mobile_user.create([
			{username: "appuser", email: "test@test.com", password:"password", groupId: 1},
			{username: "appuser2", email: "test2@test.com", password:"password2", groupId: 1},
			{username: "appuser3", email: "test3@test.com", password:"password3", groupId: 2}
		]);
	});
	
	// Position
	app.dataSources.postgresql_heroku.automigrate('position', function(err) {
		if (err) throw err;
	});
	
	// Weather Report
	app.dataSources.postgresql_heroku.automigrate('weather_report', function(err) {
		if (err) throw err;
	});
};