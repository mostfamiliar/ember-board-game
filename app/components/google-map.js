import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  whoAmI: Ember.inject.service(),
  
  showMap: Ember.on('didInsertElement', 'didUpdateAttrs', function(){
    var user = this.get('user');
    var container = this.$('.map-display')[0];
    var options = {
      center: this.get('map').center(user.get('lat'), user.get('lng')),
      zoom: 15
    };
    var userLocation = user.get('userLocation');
    var newMap = this.get('map').findMap(container, options);
    this.get('map').placeMarker(newMap, userLocation);
  }),
  actions: {
  }
});
