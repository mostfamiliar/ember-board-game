import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  whoAmI: Ember.inject.service(),
  model(){
    return Ember.RSVP.hash({
      whoAmI: this.get('whoAmI'),
      databaseGames: this.store.findAll('game')
    });
  },

  actions: {
    addToWantList(params){
      var model = this.currentModel;
      console.log(params);
      var user = model.whoAmI.get('user');
      params.forEach(function(id){
        model.databaseGames.forEach(function(game){
          if(game.get('id') === id){
            game.get('willingPlayers').addObject(user);
            game.save().then(function(){
              return user.save();
            });
          }
        });
      });
      this.transitionTo('admin');
    },

    updateProfile(params){
      var user = this.currentModel.whoAmI.get('user');
      var address = params.address.replace(/ /g, '+');
      var key = config.myApiKey;
      var locUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
      Ember.$.getJSON(locUrl).then(function(responseJSON){
        var location = responseJSON.results[0].geometry.location;
        params.lat = location.lat;
        params.lng = location.lng;
        Object.keys(params).forEach(function(key){
          if(params[key] !== undefined && params[key] !== ''){
            user.set(key, params[key]);
          }
        });
        user.save();
      });
      this.transitionTo('admin');
    }
  }
});
