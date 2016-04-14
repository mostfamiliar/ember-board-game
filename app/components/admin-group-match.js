import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  currentUser: Ember.computed.alias('whoAmI.user.wantToPlay'),
  actions: {
    matchByGame(users){
      // var myGames = this.get('whoAmI').get('user').get('wantToPlay');
      // console.log(myGames.objectAt(0));
      users.forEach(function(user){
        console.log(user.get('username'));
      })
      for(var i=0; i < this.get('users.length'); i++)
      {
        var singleUser = this.get('users').objectAt(i);
        var gameList = singleUser.get('wantToPlay');
        gameList.forEach(function(game){
          console.log(game.get('title'));
        });
      }

    }
  }
});
