import Ember from 'ember';

export default Ember.Service.extend({
  user: {username: "Guest", id: 0, lat: 45.520705, lng: -122.677397},

  logIn(user){
    this.set('user', user);
  },

  logOut(){
    this.set('user', {username: "Guest", id: 0});
  },
  

  userLocation: Ember.computed('user.lat', 'user.lng', function(){
    return {
      lat: this.get('user.lat'),
      lng: this.get('user.lng')
    };
  })
});
