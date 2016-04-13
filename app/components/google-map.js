import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  whoAmI: Ember.inject.service(),

  findDistance: Ember.computed('showDistance', function(){
    return this.get('showDistance');
  }),

  showMap: Ember.on('didInsertElement', 'didUpdateAttrs', 'findDistance', function(){
    var user = this.get('user');
    var browser = this.get('whoAmI').get('user');
    var container = this.$('.map-display')[0];
    var options = {
      center: this.get('map').center(user.get('lat'), user.get('lng')),
      zoom: 15
    };
    var userLocation = user.get('userLocation');
    var newMap = this.get('map').findMap(container, options);
    this.get('map').placeMarker(newMap, userLocation);
    if(this.get('findDistance')){
      var browserLocation = browser.get('userLocation');
      console.log(browserLocation);
      this.get('map').placeMarker(newMap, browserLocation);
    }
  }),
  actions: {
  }
});
