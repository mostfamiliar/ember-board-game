import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  showDistance: false,
  actions: {
    showDistance(){
      this.set('showDistance', true);
    }
  }
});
