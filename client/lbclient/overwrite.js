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
		opts.headers["X-Access-Token"] = window.localStorage.getItem("access_token", "");
	}
	
	Memory.prototype.filterUnknownPropertiesFix = function() {
		this.__unknownProperties = {};
		
		this.__unknownProperties[p] = data[p];
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
	      data = doc.data;
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
		
		if(window.document === undefined)
		{
			// in worker thread
			if(!window.localPouchDb)
		    {
		      window.localPouchDb = new PouchDB('pouch-db');
			}
			
			window.localPouchDb.upsert(localStorage, function(doc) {
				doc.data = data;
				return doc;			
			}).catch(function(err) {
				console.log(err);
				var newDoc = {
					_id: localStorage,
					data: data
				};
				window.localPouchDb.putIfNotExists(newDoc);
			});
		}
		else
		{
			if(!window.pouchWorker) {
				window.pouchWorker = new Worker("js/sync/PouchWorker.js");
			}
			
			window.pouchWorker.postMessage(data);
		}    
		
		/*window.localPouchDb.get(localStorage).then(function(doc) {
			data._rev = doc._rev;
			data._id = localStorage;
			window.localPouchDb.put(data).then(function(res) {
				console.log("successful insert");
			}).catch(function(err) {
				throw err;
			});
		}).catch(function(err) {
			// If this is the first time the database document is requested, call put with no rev field
			if(err.status === 404 && err.name === "not_found" && err.reason === "missing")
			{
				data._id = localStorage;
				window.localPouchDb.put(data);
			}
		});*/
		
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
