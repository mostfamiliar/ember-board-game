import Ember from 'ember';

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
        //var self = this;
        var model = this.currentModel;
        console.log(params);
        var user = model.whoAmI.get('user'); // console log this!!
        console.log(user);
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
        // .databaseGames.forEach(function(game){
        //   params.forEach(function(id))
        //   newGame.get('willingPlayers').addObject(user);
        //   newGame.save()then(function(){
        //     return user.save();
        //   });
        // });
      }

  }
});
