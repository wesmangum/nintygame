'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var leaderboards = traceur.require(__dirname + '/../routes/leaderboards.js');


  app.get('/', dbg, home.index);
  app.get('/leaderboards', dbg, leaderboards.get);
  app.post('/submit', dbg, leaderboards.submit);
  console.log('Routes Loaded');
  fn();
}
