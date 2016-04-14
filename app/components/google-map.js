import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  whoAmI: Ember.inject.service(),

  showMap: Ember.on('didInsertElement', 'didUpdateAttrs', 'showDistance', 'showAll', function(){
    var user = this.get('user');
    var browser = this.get('whoAmI');
    var container = this.$('.map-display')[0];
    var mappy = this.get('map');
    if(this.get('showAll')){
      var allUsers = this.get('allUsers');
      var allOptions = {
        center: mappy.center(browser.get('userLocation').lat, browser.get('userLocation').lng),
        zoom: 15
      };
      var allMap = mappy.findMap(container, allOptions);
      var mapBounds = mappy.boundsService();
      allUsers.forEach(function(member){
        var formatted = mappy.placeMarker(allMap, member.get('userLocation'));
        mapBounds.extend(formatted);
      });
      allMap.fitBounds(mapBounds);
    } else {
      var options = {
        center: mappy.center(user.get('lat'), user.get('lng')),
        zoom: 15
      };
      var userLocation = user.get('userLocation');
      var newMap = mappy.findMap(container, options);
      var twoMapBounds = mappy.boundsService();
      var myFormatted = mappy.placeMarker(newMap, userLocation);
      twoMapBounds.extend(myFormatted);
      if(this.get('showDistance')){
        var browserLocation = browser.get('userLocation');
        var browserFormatted = mappy.placeMarker(newMap, browserLocation);
        twoMapBounds.extend(browserFormatted);
      }
      newMap.fitBounds(twoMapBounds);
    }
  }),
  actions: {

  }
});
