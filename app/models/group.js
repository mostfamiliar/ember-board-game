import Model from 'ember-data/model';

export default Model.extend({
  title: DS.attr(),
  members: DS.hasMany('user', {inverse:"groups"}, {async:true}),
  gamesMatched: DS.hasMany('game', {inverse:null}, {async:true})
});
