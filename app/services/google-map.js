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
    map.panTo(marker.getPosition());
    var formatted = new this.googleMaps.LatLng(userLocation);
    return formatted;
  },
  boundsService(){
    return new this.googleMaps.LatLngBounds();
  }
});
