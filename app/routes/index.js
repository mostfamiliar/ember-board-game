import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  whoAmI: Ember.inject.service(),

  model(){
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      whoAmI: this.get('whoAmI')
    });
  },

  actions: {
    newUser(params, member){
      var model = this.currentModel;
      var duplicate = false;
      var currentUser = model.whoAmI;
      model.users.forEach(function(user){
        if(params.username === user.get('username')){
          alert("That username is already taken"); // should this happen BEFORE we clear the form fields???
          duplicate = true;
        }
      });
      if (!duplicate){
        var newPerson = this.store.createRecord('user', params);
        newPerson.save();
        var address = params.address.replace(' ', '+');
        var key = config.myApiKey;
        var locUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
        Ember.$.getJSON(locUrl).then(function(responseJSON){
          console.log(responseJSON.results);
          var location = responseJSON.results[0].geometry.location;
          newPerson.set('lat', location.lat);
          newPerson.set('lng', location.lng);
          newPerson.save();
          currentUser.logIn(newPerson);
        });
        if(member){
          this.transitionTo('profile', params.username);
        } else {
          this.transitionTo('admin');
        }
      }
    },

    signIn(){
      this.transitionTo('admin');
    }
  }
});
