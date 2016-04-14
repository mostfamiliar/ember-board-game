import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  showDistance: false,
  findUser: null,
  showAll: false,

  actions: {
    showDistance(user){
      this.set('findUser', user);
      this.toggleProperty('showDistance');
    },
    showAll(){
      this.toggleProperty('showAll');
    }
  }
});
