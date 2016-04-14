import Ember from 'ember';
import config from '../config/environment';

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
        });
      }
      this.transitionTo('profile', params.username);
    },

    signIn(){
      this.transitionTo('admin');
    }
  }
});
