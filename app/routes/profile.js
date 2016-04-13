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
      }) //this is an array with one object
    });
  },

//make a list of games in db in model
  actions: {
    addToGameList(params){
      var self = this;
      var model = this.currentModel;
      var foundRecord = false;
      params.forEach(function(gameid){
        // run through database list of games, not user's list of games
        model.gameList.forEach(function(game){
          if(game.get('objectid') === gameid){
            foundRecord = true;
          }
        });
        if (foundRecord === false){
          var gameUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi2%2Fthing%3Fid%3D" + gameid + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
          console.log(gameUrl);

          Ember.$.getJSON(gameUrl).then(function(responseJSON){
            var response = responseJSON.query.results.items.item;
            console.log(response.name[0].value);
            var attributes = {
              gameId: response.id,
              title: response.name[0].value,
              image: response.image,
              description: response.description,
              published: response.yearpublished.value,
              maxPlayers: response.maxplayers.value
            };
            var newGame = self.store.createRecord('game', attributes);
            newGame.save();
            //newGame.get('ownedBy').addObject[0](localUser)
            //.then (adding rentals/cities)
            console.log(newGame);

          });

        }
      });
    }
  }
});
