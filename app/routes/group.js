import Ember from 'ember';

export default Ember.Route.extend({
  whoAmI: Ember.inject.service(),
  model(){
    return Ember.RSVP.hash({
      whoAmI: this.get('whoAmI'),
      users: this.store.findAll('user')
    });
  }
});
