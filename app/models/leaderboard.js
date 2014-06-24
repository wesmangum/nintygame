'use strict';

var leaderboardCollection = global.nss.db.collection('leaderboards');

class Leaderboard{
	static findByCharacter(obj, fn){
		leaderboardCollection.find({'character': obj.character}).sort({score: -1}).toArray((err, scores)=>{fn(scores);});
	}

	static submitScore(obj, fn){
		obj.score = obj.score * 1;
		leaderboardCollection.save(obj, (err, score)=>{
			fn();
		});
	}
}

module.exports = Leaderboard;