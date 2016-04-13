import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  actions: {
    showMap: function(user){
      console.log(user);
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(user.get('lat'), user.get('lng')),
        zoom: 15
      };
      var userLocation = {
        lat: user.get('lat'),
        lng: user.get('lng')
      };
      var newMap = this.get('map').findMap(container, options);
      this.get('map').placeMarker(newMap, userLocation);
    }
  }
});
