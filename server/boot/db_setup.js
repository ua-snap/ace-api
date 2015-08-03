// Automigrates all data models
module.exports = function(app) {
	
	app.dataSources.postgresql_heroku.automigrate(['User', 'AccessToken', 'RoleMapping', 'Role'], function(err) {
		if(err) throw err;
	});
	
	app.dataSources.postgresql_heroku.automigrate(['Checkpoint', 'Change'], function(err) {
		if(err) throw err;
	});
	
	// 	Groups
	app.dataSources.postgresql_heroku.automigrate('group', function(err) {
		if (err) throw err;
		
		// Mobile Users
		app.dataSources.postgresql_heroku.automigrate('mobile_user', function(err) {
			if(err) throw err;
			
			app.models.group.create([{name: "TestUsers"}], function(err, group) {
				app.models.mobile_user.create([
					{username: "jsentell", email: "james.g.sentell@saic.com", password:"password", groupId: group[0].id},
					{username: "jpowell", email: "jonathan.d.powell@saic.com", password:"password", groupId: group[0].id},
					{username: "pmeyer", email: "paul.meyer@nasa.gov", password:"password", groupId: group[0].id},
					{username: "hhelton", email: "heather.l.helton3.civ@mail.mil", password:"password", groupId: group[0].id},
					{username: "sspehn", email: "stephen.l.spehn.civ@mail.mil", password:"password", groupId: group[0].id},
					{username: "jpanter", email: "james.e.panter@saic.com", password:"password", groupId: group[0].id}
				]);
			});
				
			app.models.group.create([{name: "DummyUserAccounts"}], function(err, group) {
				app.models.mobile_user.create([
					{username: "appuser", email: "test@test.com", password:"password", groupId: group[0].id},
					{username: "appuser2", email: "test2@test.com", password:"password", groupId: group[0].id},
					{username: "appuser3", email: "test3@test.com", password:"password", groupId: group[0].id}			
				]);
			});			
		});
	});
	
	
	// Position
	app.dataSources.postgresql_heroku.automigrate('position', function(err) {
		if (err) throw err;
	});
	
	// Weather Report
	app.dataSources.postgresql_heroku.automigrate('weatherreport', function(err) {
		if (err) throw err;
	});
	
	// Migrate all required tables for tracking changes
	app.dataSources.postgresql_heroku.automigrate('group-changes', function(err) {
		if(err) throw err;
	});
};