import Ember from 'ember';

export default Ember.Component.extend({
  addGame: [],

  actions: {
    addToWants(){
      // console.log(this.get('addGame'));
      this.sendAction("addToWantList", this.get('addGame'));
    }
  }
});
