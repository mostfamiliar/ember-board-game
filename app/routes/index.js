import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    newUser(params){
      var newPerson = this.store.createRecord('user', params);
      console.log(newPerson);
      newPerson.save();
      this.transitionTo('index');
    }
  }
});
