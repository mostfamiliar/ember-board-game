import Model from 'ember-data/model';

export default Model.extend({
  gameId: DS.attr(),
  title: DS.attr(),
  image: DS.attr(), //url
  description: DS.attr(),
  published: DS.attr(), // string not date object
  maxPlayers: DS.attr('number'), //number of players
  ownedBy: DS.hasMany('user', {inverse:"collection"}, {async:true}),

});
