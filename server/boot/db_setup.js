// Automigrates all data models
module.exports = function(app) {
	/*app.dataSources.mongo.automigrate(['User', 'AccessToken', 'RoleMapping', 'Role', 'ACL'], function(err) {
		if(err) throw err;

		app.dataSources.mongo.automigrate(['Checkpoint', 'Change', 'checkpoint'], function(err) {
			if(err) throw err;

			// 	Groups
			app.dataSources.mongo.automigrate('group', function(err) {
				if (err) throw err;

				// Auto-migrate sync for group (group-change)
				app.dataSources.mongo.automigrate('group-change', function(err) {
					if(err) throw err;

					// Mobile Users
					app.dataSources.mongo.automigrate('mobile_user', function(err) {
						if(err) throw err;

						// Mobile Users change
						app.dataSources.mongo.automigrate('mobile_user-change', function(err) {
							if(err) throw err;

							// Now all users and groups can be added
							app.models.group.create([{name: "TestUsers"}], function(err, group) {
								app.models.mobile_user.create([
									{username: "jsentell", email: "james.g.sentell@saic.com", password:"password", groupId: group[0].id},
									{username: "jpowell", email: "jonathan.d.powell@saic.com", password:"password", groupId: group[0].id},
									{username: "pmeyer", email: "paul.meyer@nasa.gov", password:"password", groupId: group[0].id},
									{username: "hhelton", email: "heather.l.helton3.civ@mail.mil", password:"password", groupId: group[0].id},
									{username: "sspehn", email: "stephen.l.spehn.civ@mail.mil", password:"password", groupId: group[0].id},
									{username: "jpanter", email: "james.e.panter@saic.com", password:"password", groupId: group[0].id},
									{username: "lforbes", email: "lforbes@test.com", password:"password", groupId: group[0].id}
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
			app.dataSources.mongo.automigrate('position', function(err) {
				if (err) throw err;

				// Migrate sync for mobile_user
				app.dataSources.mongo.automigrate('position-change', function(err) {
					if(err) throw err;
				});
			});

			// Weather Report
			app.dataSources.mongo.automigrate('weatherreport', function(err) {
				if (err) throw err;

				// Migrate sync for mobile_user
				app.dataSources.mongo.automigrate('weatherreport-change', function(err) {
					if(err) throw err;
				});
			});

			// Settings
			app.dataSources.mongo.automigrate('settings', function(err) {
				if (err) throw err;

				// Migrate sync for mobile_user
				app.dataSources.mongo.automigrate('settings-change', function(err) {
					if(err) throw err;
				});
			});
		});
	});*/

	// Local memory setup
	app.models.group.create([{name: 'TestUsers'}], function(err, group) {
		app.models.mobile_user.create([{username: 'testuser', password: 'password', email: 'test@test.com', groupId: group[0].id}], function(err, user) {
			app.models.golf_report.create([{userId: user[0].id, strokes: 4, par: 5, yardage: 350}]);
		});
	});


};
