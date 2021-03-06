import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  showDistance: false,
  findUser: null,
  showAll: false,

  actions: {
    showDistance(user){
      this.set('findUser', user);
      this.set('showAll', false);
      this.set('showDistance', true);
    },
    showAll(){
      this.set('showDistance', false);
      this.toggleProperty('showAll');
    }
  }
});
