module.exports = function(app)
{
	/* Setup for local instance */
	
	app.models.group.create([{name: "TestUsers"}], function(err, group) {
		app.models.mobile_user.create([
			{username: "jsentell", email: "james.g.sentell@saic.com", password:"password", groupId: group.id},
			{username: "jpowell", email: "jonathan.d.powell@saic.com", password:"password", groupId: group.id},
			{username: "pmeyer", email: "paul.meyer@nasa.gov", password:"password", groupId: group[0].id},
			{username: "hhelton", email: "heather.l.helton3.civ@mail.mil", password:"password", groupId: group.id},
			{username: "sspehn", email: "stephen.l.spehn.civ@mail.mil", password:"password", groupId: group.id},
			{username: "jpanter", email: "james.e.panter@saic.com", password:"password", groupId: group.id}
		]);
	});
		
	app.models.group.create([{name: "DummyUserAccounts"}], function(err, group) {
		app.models.mobile_user.create([
			{username: "appuser", email: "test@test.com", password:"password", groupId: group.id},
			{username: "appuser2", email: "test2@test.com", password:"password", groupId: group.id},
			{username: "appuser3", email: "test3@test.com", password:"password", groupId: group.id}			
		]);
	});	
};