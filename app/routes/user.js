import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', params.user_id),
      allUsers: this.store.findAll('user') // not currently using this - change if not used
    });
  },

});
