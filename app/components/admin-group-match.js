import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),

  localUsers: Ember.computed.filter('users', function(user, index, array){
    var lat1 = this.get('whoAmI').get('userLocation').lat;
    var lat2 = user.get('lat');
    var lon1 = this.get('whoAmI').get('userLocation').lng;
    var lon2 = user.get('lng');
    var dist = 0;
    var radlat1 = Math.PI * lat1/180;
  	var radlat2 = Math.PI * lat2/180;
  	var theta = lon1-lon2;
  	var radtheta = Math.PI * theta/180;
  	dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist);
  	dist = dist * 180/Math.PI;
  	dist = dist * 60 * 1.1515;
    console.log(dist);
    if(dist >= 15){
      return false;
    } else {
      return true;
    }
  }),
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
