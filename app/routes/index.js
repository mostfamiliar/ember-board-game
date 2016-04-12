import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('user');
  },

  actions: {
    newUser(params){
      var model = this.currentModel;
      var duplicate = false;
      model.forEach(function(user){
        if(params.username === user.get('username')){
          alert("That username already has an account");
          duplicate = true;
        }
      });
      if (!duplicate){
        var newPerson = this.store.createRecord('user', params);
        console.log(newPerson);
        newPerson.save();
      }
      this.transitionTo('index');
    },

    signIn(params){
      console.log(params);
      this.transitionTo('profile', params);
    }
  }
});
