'use strict';

var traceur = require('traceur');
var Leaderboard = traceur.require(__dirname + '/../models/leaderboard.js');

exports.get = (req, res)=>{
	Leaderboard.findByCharacter(req.query, scores=>{
		res.render('leaderboards/index', {scores: scores}, (err, html)=>{
			res.send(html);
		});
	});
};

exports.submit = (req, res)=>{
	Leaderboard.submitScore(req.body, ()=>{
		Leaderboard.findByCharacter(req.body, scores=>{
			res.render('leaderboards/index', {scores: scores}, (err, html)=>{
				res.send(html);
			});
		});
	});
};
