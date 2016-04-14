import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  addCollectionGames: false,
  addGame: [],
  myCollection: Ember.on('didInsertElement','whoAmI', function(){
    var username = this.get('whoAmI').get('user').get('username');
    console.log(username);
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi2%2Fcollection%3Fusername%3D" + username + "%26own%3D%5B1%5D'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return Ember.$.getJSON(url).then(function(responseJSON){
      console.log(responseJSON.query.results.items.item);
      return responseJSON.query.results.items.item;
    });
  }),
  actions: {
    addCollectionGames(){
      this.set('addCollectionGames', true);
    },
    addToCollection(){

    }
  }
});
