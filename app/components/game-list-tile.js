import Ember from 'ember';

export default Ember.Component.extend({
  addGame: [],

  actions: {
    addToCollection(){
      console.log(this.get('addGame'));
    }
  }
});