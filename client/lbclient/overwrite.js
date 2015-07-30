var enclose = function() {(
	
	Memory.prototype.windowLocationFix = function() {
		if(!opts.uri && !opts.uri.protocol)
		{
			opts.protocol = opts.protocol || window.location.protocol
		}
		else
		{
			opts.protocol = opts.uri.protocol;
		}
	};
	
	Memory.prototype.authorizationHeaderAddition = function() {
		opts.headers["authorization"] = window.localStorage.getItem("access_token", "");
	}
	
	
	Memory.prototype.loadFromFile = function(callback) {
	  var self = this;
	  var hasLocalStorage = typeof window !== 'undefined' && window.localStorage;
	  var localStorage = hasLocalStorage && this.settings.localStorage;
	
	  if (self.settings.file) {
	    fs.readFile(self.settings.file, {encoding: 'utf8', flag: 'r'}, function (err, data) {
	      if (err && err.code !== 'ENOENT') {
	        callback && callback(err);
	      } else {
	        parseAndLoad(data);
	      }
	    });
	  } else if(localStorage) {
	    if(!window.localPouchDb)
	    {
	      window.localPouchDb = new PouchDB('pouch-db');
	    }
	    //var data = window.localStorage.getItem(localStorage);
	    var data = undefined;
	    window.localPouchDb.get(localStorage).then(function(doc) {
		  //alert('get returned successful');
	      data = doc;
	    }).catch(function(err) {
			//alert('get returned error');
			console.log(err);
			data = {};
		});
		
		parseAndLoad(data);		
		
	  } else {
	    process.nextTick(callback);
	  }
	
	  function parseAndLoad(data) {
	    if (data) {
	      /*try {
	        data = JSON.parse(data.toString());
	      } catch(e) {
	        return callback(e);
	      }*/
	
	      self.ids = data.ids || {};
	      self.cache = data.models || {};
	    } else {
	      if(!self.cache) {
	        self.ids = {};
	        self.cache = {};
	      }
	    }
	    callback && callback();
	  }
	};
	
	/*!
	 * Flush the cache into the json file if necessary
	 * @param {Function} callback
	 */
	Memory.prototype.saveToFile = function (result, callback) {
	  var self = this;
	  var file = this.settings.file;
	  var hasLocalStorage = typeof window !== 'undefined' && window.localStorage;
	  var localStorage = hasLocalStorage && this.settings.localStorage;
	  if (file) {
	    if(!self.writeQueue) {
	      // Create a queue for writes
	      self.writeQueue = async.queue(function (task, cb) {
	        // Flush out the models/ids
	        var data = JSON.stringify({
	          ids: self.ids,
	          models: self.cache
	        }, null, '  ');
	
	        fs.writeFile(self.settings.file, data, function (err) {
	          cb(err);
	          task.callback && task.callback(err, task.data);
	        });
	      }, 1);
	    }
	    // Enqueue the write
	    self.writeQueue.push({
	      data: result,
	      callback: callback
	    });
	  } else if (localStorage) {
	    // Flush out the models/ids
	    /*var data = JSON.stringify({
	      ids: self.ids,
	      models: self.cache
	    }, null, '  ');*/
		var data = {
			ids: self.ids,
			models: self.cache
		};
	    if(!window.localPouchDb)
	    {
	      window.localPouchDb = new PouchDB('pouch-db');
	    }
	    window.localPouchDb.put(data, localStorage);
	    //window.localStorage.setItem(localStorage, data);
	    process.nextTick(function () {
	      callback && callback(null, result);
	    });
	  } else {
	    process.nextTick(function () {
	      callback && callback(null, result);
	    });
	  }
	};
)};
