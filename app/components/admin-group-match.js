import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  currentUser: Ember.computed.alias('whoAmI.user.wantToPlay'),
  actions: {
    matchByGame(users){
      var myGames = this.get('whoAmI').get('user').get('wantToPlay');
      var gamesMatched = [];
      myGames.forEach(function(currentGame){
        var currentGameTitle = currentGame.get('title');
        users.forEach(function(user){
          var gameList = user.get('wantToPlay');
          gameList.forEach(function(game){
            var userGameTitle = game.get('title');
            if (userGameTitle === currentGameTitle){
                gamesMatched.push({currentGame: currentGameTitle, user: user.get('username')});
                return gamesMatched;
            }
          });
        });
    });
    console.log(gamesMatched);
    }
  }
});
