// Automigrates all data models
module.exports = function(app) {
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

	app.dataSources.mongo.automigrate(['User', 'AccessToken', 'RoleMapping', 'Role', 'ACL'], function(err) {
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
							
							app.models.mobile_user.find({where: {'username': 'admin'}}, function(err, users) {
								if(users.length === 0) {
									app.models.mobile_user.create([{username: 'admin', password: 'password', email: 'admin@email.com'}], function(err, user) {
										Role.create({
											name: 'admin'
										}, function(err, role) {
											if (err) throw err;
											role.principals.create({
												principalType: RoleMapping.USER,
												principalId: user[0].id
											}, function(err, principal) {
												if (err) throw err;
							});
										});
									});
								}
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
	});	

};