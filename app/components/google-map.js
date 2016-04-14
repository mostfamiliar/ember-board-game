import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  whoAmI: Ember.inject.service(),

  showMap: Ember.on('didInsertElement', 'didUpdateAttrs', 'showDistance', 'showAll', function(){
    var user = this.get('user');
    var browser = this.get('whoAmI');
    var container = this.$('.map-display')[0];
    var mappy = this.get('map');
    console.log(this.get('showAll'));
    if(this.get('showAll')){
      var allUsers = this.get('allUsers');
      console.log(allUsers);
      var allOptions = {
        center: mappy.center(browser.get('userLocation').lat, browser.get('userLocation').lng),
        zoom: 15
      };
      console.log(allOptions);
      var allMap = mappy.findMap(container, allOptions);
      allUsers.forEach(function(member){
        mappy.placeMarker(allMap, member.get('userLocation'));
      });
    } else {
      var options = {
        center: mappy.center(user.get('lat'), user.get('lng')),
        zoom: 15
      };
      var userLocation = user.get('userLocation');
      var newMap = mappy.findMap(container, options);
      mappy.placeMarker(newMap, userLocation);
      if(this.get('showDistance')){
        var browserLocation = browser.get('userLocation');
        mappy.placeMarker(newMap, browserLocation);
        newMap.setZoom(11);
      }
    }
  }),
  actions: {

  }
});
