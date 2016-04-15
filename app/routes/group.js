import Ember from 'ember';

export default Ember.Route.extend({
  whoAmI: Ember.inject.service(),
  model(params){
    return Ember.RSVP.hash({
      whoAmI: this.get('whoAmI'),
      users: this.store.findAll('user'),
      group: this.store.findRecord('group', params.group_id)
    });
  }
});
