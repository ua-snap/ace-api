module.exports = function(app) {
    app.models.group.create([{name: "IonicViewUsers"}]);
    app.models.group.create([{name: "DummyUserAccounts"}]);
    
    app.models.mobile_user.create([
        {username: "appuser", email: "test@test.com", password:"password", groupId: 2},
        {username: "appuser2", email: "test2@test.com", password:"password", groupId: 2},
        {username: "appuser3", email: "test3@test.com", password:"password", groupId: 2},
        {username: "jsentell", email: "james.g.sentell@saic.com", password:"password", groupId: 1},
        {username: "jpowell", email: "jonathan.d.powell@saic.com", password:"password", groupId: 1},
        {username: "pmeyer", email: "paul.meyer@nasa.gov", password:"password", groupId: 1},
        {username: "hhelton", email: "heather.l.helton3.civ@mail.mil", password:"password", groupId: 1},
        {username: "sspehn", email: "stephen.l.spehn.civ@mail.mil", password:"password", groupId: 1},
        {username: "jpanter", email: "james.e.panter@saic.com", password:"password", groupId: 1},
    ]);
};