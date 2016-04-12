import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return Ember.RSVP.hash({
      localUser: this.store.query('user', {
        orderBy: 'username',
        equalTo: params.username
      })
    });
  }
});
