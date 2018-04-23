var path = require("path");
var friends = require('../data/friends.js');



var getFriends = function showFriends(app){
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });
    app.post("/api/friends", function(req, res){
        var newFriend = req.body
        var friendScore = newFriend.scores;
        var scoreArray = [];
        var match = 0;
       
        console.log("friend scores: " + friendScore);

        for(i = 0; i < friends.length; i++){    
            var scoreDiff = 0;
            for(x = 0; x < friendScore.length; x++){
                scoreDiff += Math.abs(friends[i].scores[x] - friendScore[x])
            }
            scoreArray.push(scoreDiff);
           
            // console.log(scoreArray)
            console.log(friends[i].name + " " + scoreDiff);
         }

        for(i = 0; i < scoreArray.length; i++){
            if(scoreArray[i] <= scoreArray[match]){
                match = i;
            }
        } 

        console.log("Closest match: " + friends[match].name);
        res.json(friends[match]);

        friends.push(newFriend);
     
    });

}; 

module.exports = getFriends;