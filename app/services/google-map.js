import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,
  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  placeMarker(map, userLocation){
    var marker = new this.googleMaps.Marker({
      map: map,
      position: userLocation,
      title: 'User Location'
    });
    return marker;
  },
  getDistance(browser, user){
    var origin = this.center(browser.get('userLocation').lat, browser.get('userLocation').lng);
    var destination = this.center(user.get('userLocation').lat, user.get('userLocation').lng);
    var service = new this.googleMaps.DistanceMatrixService();
    var gmapAlias = this.googleMaps;
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        unitSystem: this.googleMaps.UnitSystem.IMPERIAL,
        travelMode: this.googleMaps.TravelMode.DRIVING,

      }, callback);
    function callback(response, status){
      console.log(response);
      if (status === gmapAlias.DistanceMatrixStatus.OK) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var distance = response.rows[0].elements[0].distance.value;
        console.log(distance);
        // for (var i = 0; i < origins.length; i++) {
        //   var results = response.rows[i].elements;
        //   for (var j = 0; j < results.length; j++) {
        //     var element = results[j];
        //     var distance = element.distance.text;
        //     var duration = element.duration.text;
        //     var from = origins[i];
        //     var to = destinations[j];
        //   }
        // }
      }
    }
  }
});
