import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  whoAmI: Ember.inject.service(),

  findDistance: Ember.computed('showDistance', function(){
    var browser = this.get('whoAmI');
    var user = this.get('user');

    if(this.get('showDistance')){
      this.get('map').getDistance(browser, user);
    }
  }),

  showMap: Ember.on('didInsertElement', 'didUpdateAttrs', 'showDistance', function(){
    var users = this.get('users');
    for(var i = 0; i <= this.get('users.length'); i++) {
      var user = this.get('users').objectAt(i);
      console.log(user);
    }
    var browser = this.get('whoAmI');
    var container = this.$('.map-display')[0];
    var options = {
      center: this.get('map').center(user.get('lat'), user.get('lng')),
      zoom: 15
    };
    var userLocation = user.get('userLocation');
    console.log(userLocation);
    var newMap = this.get('map').findMap(container, options);
    this.get('map').placeMarker(newMap, userLocation);
    if(this.get('showDistance')){
      var browserLocation = browser.get('userLocation');
      this.get('map').placeMarker(newMap, browserLocation);
      newMap.setZoom(11);
    }
  }),
  actions: {

  }
});
