module.exports = function(app) {
	// Create group
	app.models.group.create([{name: "Group1"}]);
	
	app.models.mobile_user.create([
		{username: "appuser", email: "test@test.com", password:"password", groupId: 1},
		{username: "appuser2", email: "test2@test.com", password:"password2", groupId: 1},
	]);
};