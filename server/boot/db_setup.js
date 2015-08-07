// Automigrates all data models
module.exports = function(app) {
	
	app.dataSources.postgresql_heroku.isActual(['User', 'AccessToken', 'RoleMapping', 'Role', 'ACL', 'Checkpoint', 'Change', 'group', 'group-change', 'mobile_user', 'mobile_user-change', 'position', 'position-change', 'weatherreport', 'weatherreport-change'], function(err, actual) {
		if(err) throw err;
		
		if(!actual)
		{
			app.dataSources.postgresql_heroku.autoupdate(['User', 'AccessToken', 'RoleMapping', 'Role', 'ACL'], function(err) {
				if(err) throw err;
				
				app.dataSources.postgresql_heroku.autoupdate(['Checkpoint', 'Change'], function(err) {
					if(err) throw err;
					
					// 	Groups
					app.dataSources.postgresql_heroku.autoupdate('group', function(err) {
						if (err) throw err;
						
						// Auto-migrate sync for group (group-change)
						app.dataSources.postgresql_heroku.autoupdate('group-change', function(err) {
							if(err) throw err;
							
							// Mobile Users
							app.dataSources.postgresql_heroku.autoupdate('mobile_user', function(err) {
								if(err) throw err;
								
								// Mobile Users change
								app.dataSources.postgresql_heroku.autoupdate('mobile_user-change', function(err) {
									if(err) throw err;
									
									// Now all users and groups can be added
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
						});
					});
					
					
					// Position
					app.dataSources.postgresql_heroku.autoupdate('position', function(err) {
						if (err) throw err;
						
						// Migrate sync for mobile_user
						app.dataSources.postgresql_heroku.autoupdate('position-change', function(err) {
							if(err) throw err;
						});
					});
					
					// Weather Report
					app.dataSources.postgresql_heroku.autoupdate('weatherreport', function(err) {
						if (err) throw err;
						
						// Migrate sync for mobile_user
						app.dataSources.postgresql_heroku.autoupdate('weatherreport-change', function(err) {
							if(err) throw err;
						});
					});
				});
			});	
		}
	});
};