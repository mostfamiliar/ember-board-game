import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var username = "lightlines";
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20%27https%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi2%2Fcollection%3Fusername%3D" + username + "%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    console.log(url);
    return Ember.RSVP.hash({
      gameList: Ember.$.getJSON(url).then(function(responseJSON){
        return responseJSON.query.results.items;
      })
    });
  }
});
