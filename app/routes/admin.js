import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  whoAmI: Ember.inject.service(),
  model(){
    return Ember.RSVP.hash({
      whoAmI: this.get('whoAmI'),
      databaseGames: this.store.findAll('game'),
      users: this.store.findAll('user', {include: 'wantToPlay'})
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
    },

    createGroups(gamesMatched){
      var model = this.currentModel;
      var user = model.whoAmI.get('user');
      for(var i = 0; i < gamesMatched.length; i++){
        var thisGroup = gamesMatched[i];
        var groupGame = thisGroup[0].currentGame;
        var params = {
          title: groupGame.get('title'),
          gameMatched: groupGame
        };
        var newGroup = this.store.createRecord('group', params);
        newGroup.get('members').addObject(user);
        user.save();
        for(var j = 0 ; j < thisGroup.length; j++){
          var thisUser = thisGroup[j].user;
          console.log(thisUser.get('username'));
          newGroup.get('members').addObject(thisUser);
          console.log(newGroup.get('members').get('length'));
          thisUser.save();
        }
        newGroup.save();
      }
    },

    deleteGroup(group){
      var members = group.get('members'); //array of users
      members.forEach(function(user){
        user.get('groups').removeObject(group);
        user.save();
      });
      group.destroyRecord();
      this.transitionTo('admin');
    }
  }
});
