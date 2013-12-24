(function(window) {

  'use strict';

  var _Rnotifier = function() {
    this.opts = {};
  };

  window.Rnotifier = window.Rnotifier || (new _Rnotifier());

  var _R = _Rnotifier.prototype;
  
  _R.VERSION = '0.0.1'

  _R.init = function(opts){
    this.opts = opts;
  };

  _R.valid_opts = function(){
    return this.opts['app_id'] ? true : false;
  };

  _R.API_HOST = 'http://api.rnotifier.com/event/browser';

  _R.eventData = function(name, data){
    var date = new Date();
    return {
      client: 'js', 
      version: this.VERSION, 
      occurred_at: (date.getTime()/1000),
      timezone: date.getTimezoneOffset(),
      name: name,
      data: data
    }
  };

  _R.notify = function(name, data){
    if(!this.valid_opts() || !name || !data){ return false; }
    
    if(typeof name == 'string'){
      this._send({'event': this.eventData(name, data)});
    }
  };

  _R._send = function(data){
    var xhr, self = this;
    
    console.log(data);
    return;

    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open("POST", self.API_HOST, true);
    xhr.setRequestHeader("X-App-Id", self.opts.app_id);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      //if (xhr.readyState == 4) { var result = JSON.parse(xhr.responseText); }
      if(self.config.debug){
        self.log(xhr.responseText);
      }
    }

    xhr.send(JSON.stringify(data))
  };

  _R.log = function(data){
    if(window.console.log) {
      window.console.log(data);
    }
  };


})(this);
