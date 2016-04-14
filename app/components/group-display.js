import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  showDistance: false,
  findUser: null,
  actions: {
    showDistance(user){
      this.set('findUser', user);
      this.set('showDistance', true);
    }
  }
});
