import Ember from 'ember';

export default Ember.Component.extend({
  addGame: [],
  sortedGames: Ember.computed.sort('games', 'sortDefinition'),
  sortDefinition: ['title'],

  actions: {
    addToWants(){
      // console.log(this.get('addGame'));
      this.sendAction("addToWantList", this.get('addGame'));
    }
  }
});
