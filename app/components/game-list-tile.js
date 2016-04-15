import Ember from 'ember';

export default Ember.Component.extend({
  addGame: [],

  actions: {
    addToCollection(){
      this.sendAction("addToGameList", this.get('addGame'));
    }
  }
});
