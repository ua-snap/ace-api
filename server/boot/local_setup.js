module.exports = function(app)
{
	/* Setup for local instance */
	/*app.models.group.create([{name: "test"}]);
	
	app.models.mobile_user.create([{username:"appuser", password:"password", email:"test@test.com", groupId: 1}]);
	
	app.models.position.create([{userId:1, timestamp:0, latlng: {
		lat: 30,
		lng: 30
	}}])
	
	app.models.weatherreport.create([{userId: 1, positionId: 1, cloudCover: "1/8th"}]);*/
	
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
};