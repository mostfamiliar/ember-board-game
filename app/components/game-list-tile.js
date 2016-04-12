import Ember from 'ember';

export default Ember.Component.extend({
    addGame: [],
    allGames: Ember.computed('games', function() {
      var games = [];
      this.get('games').forEach(function(game){
        games.push(game);
      });
      console.log(games);
      return games;
    }),

    actions: {
      addToCollection(){
        console.log(this.get('addGame'));
      }
  }
});
