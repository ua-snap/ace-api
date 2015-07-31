// TODO(bajtos) Move the bi-di replication to loopback core,
// add model settings to enable the replication.
// Example:
//  LocalTodo: { options: {
//    base: 'Todo',
//    replicate: {
//      target: 'Todo',
//      mode: 'push' | 'pull' | 'bidi'
//    }}}
var proquint = require('proquint');

module.exports = function(client) {
  var LocalGroup = client.models.LocalGroup;
  var RemoteGroup = client.models.RemoteGroup;
  var LocalMobileUser = client.models.LocalMobileUser;
  var RemoteMobileUser = client.models.RemoteMobileUser;
  var LocalPosition = client.models.LocalPosition;
  var RemotePosition = client.models.RemotePosition;
  var LocalWeatherReport = client.models.LocalWeatherReport;
  var RemoteWeatherReport = client.models.RemoteWeatherReport;
    

  client.network = {
    _isConnected: true,
    get isConnected() {
      console.log('isConnected?', this._isConnected);
      return this._isConnected;
    },
    set isConnected(value) {
      this._isConnected = value;
    }
  };

  // setup model replication
  var since = { push: -1, pull: -1 };
  function sync(cb) {
    
    // Get the current group id
    var groupId = JSON.parse(window.localStorage.getItem("currentUser", {})).groupId;
    
    // Get array of user ids for users in the group
    var groupIdArray = JSON.parse(window.localStorage.getItem("groupUserIds", []));
    
    // GROUP AND MOBILE USERS
    
    // Replicate the remote group item (only one)
    /*RemoteGroup.findOne({where: {id: groupId}}, function(err, res) {
      LocalGroup.upsert(res.toJSON(), function(err, res) {
        if(err) throw err;
      });
    });
    
    RemoteMobileUser.find({where: {groupId: groupId}}, function(err, res) {
      for(var i = 0; i < res.length; i++)
      {
        var user = res[i].toJSON();
        user.password = "password";
        LocalMobileUser.upsert(user, function(err, res) {
          if(err) throw err;
        });
      }
    });
    
    // Positions
    RemoteGroup.find({where: {id: groupId}, include: "Positions"}, function(err, res) {
      for(var i = 0; i < res.length; i++)
      {
        LocalPosition.upsert(res[i].toJSON(), function(err, res) {
          if(err) throw err;
        });
      }
    });
    
    // Weather Reports
    RemoteGroup.find({where: {id: groupId}, include: "WeatherReports"}, function(err, res) {
      for(var i = 0; i < res.length; i++)
      {
        LocalWeatherReport.upsert(res[i].toJSON(), function(err, res) {
          if(err) throw err;
        });
      }
    });*/
    
    LocalGroup.replicate(
      RemoteGroup,
      since.push,
      function pushed(err, conflicts, cps) {
        since.push = cps;
        RemoteGroup.replicate(
          LocalGroup,
          since.pull,
          function pulled(err, conflicts, cps) {
            since.pull = cps;
            cb && cb();
          });
      });
      
     LocalMobileUser.replicate(
      RemoteMobileUser,
      since.push,
      function pushed(err, conflicts, cps) {
        since.push = cps;
        RemoteMobileUser.replicate(
          LocalMobileUser,
          since.pull,
          function pulled(err, conflicts, cps) {
            since.pull = cps;
            cb && cb();
          });
      });
      
      LocalPosition.replicate(
      RemotePosition,
      since.push,
      function pushed(err, conflicts, cps) {
        since.push = cps;
        RemotePosition.replicate(
          LocalPosition,
          since.pull,
          function pulled(err, conflicts, cps) {
            since.pull = cps;
            cb && cb();
          });
      });
      
      LocalWeatherReport.replicate(
      RemoteWeatherReport,
      since.push,
      function pushed(err, conflicts, cps) {
        since.push = cps;
        RemoteWeatherReport.replicate(
          LocalWeatherReport,
          since.pull,
          function pulled(err, conflicts, cps) {
            since.pull = cps;
            cb && cb();
          });
      });
  }

  // sync local changes if connected
  LocalGroup.on('after save', function(ctx, next) {
      next();
      sync();
  });
  LocalGroup.on('after delete', function(ctx, next) {
      next();
      sync();
  });

  LocalMobileUser.on('after save', function(ctx, next) {
      next();
      sync();
  });
  
  LocalMobileUser.on('after delete', function(ctx, next) {
      next();
      sync();
  });

  LocalPosition.on('after save', function(ctx, next) {
      next();
      sync();
  });
  LocalPosition.on('after delete', function(ctx, next) {
      next();
      sync();
  });

  LocalWeatherReport.on('after save', function(ctx, next) {
      next();
      sync();
  });
  LocalWeatherReport.on('after delete', function(ctx, next) {
    next();
    sync();
  });

  client.sync = sync;

  client.getReadableModelId = function(modelId) {
    return proquint.encode(new Buffer(modelId.substring(0, 8), 'binary'));
  };
};