import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi2%2Fcollection%3Fusername%3D" + params.username + "%26own%3D%5B1%5D'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return Ember.RSVP.hash({
      gameList: Ember.$.getJSON(url).then(function(responseJSON){
        return responseJSON.query.results.items;
      }),
      localUser: this.store.query('user', {
        orderBy: 'username',
        equalTo: params.username
      }), //this is an array with one object
      databaseGames: this.store.findAll('game')
    });
  },

  actions: {
    addToGameList(params){
      var self = this;
      var model = this.currentModel;
      var foundGame;
      console.log(model.databaseGames);
      params.forEach(function(gameid){
        var foundRecord = false;
        // run through database list of games, not user's list of games
        console.log(gameid);
        model.databaseGames.forEach(function(game){
          if(game.get('gameId') === gameid){
            console.log(game.get('gameId'));
            foundRecord = true;
            foundGame = game;
          }
        });
        if (foundRecord === false){
          var gameUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi2%2Fthing%3Fid%3D" + gameid + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

          Ember.$.getJSON(gameUrl).then(function(responseJSON){
            var response = responseJSON.query.results.items.item;
            var thisTitle;
            if(Ember.isArray(response.name)){
              thisTitle = response.name[0].value;
            } else {
              thisTitle = response.name.value;
            }
            var attributes = {
              gameId: response.id,
              title: thisTitle,
              image: response.image,
              description: response.description,
              published: response.yearpublished.value,
              maxPlayers: response.maxplayers.value
            };
            var newGame = self.store.createRecord('game', attributes);
            var user =model.localUser.objectAt(0);
            newGame.get('ownedBy').addObject(user);
            newGame.get('willingPlayers').addObject(user);
            newGame.save().then(function(){
              return user.save();
            });
          });
        } else {
          var user = model.localUser.objectAt(0);
          foundGame.get('ownedBy').addObject(user);
          foundGame.get('willingPlayers').addObject(user);
          foundGame.save().then(function(){
            return user.save();
          });
        }
      });
      this.transitionTo('admin');
    }
  }
});
