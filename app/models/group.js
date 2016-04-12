import Model from 'ember-data/model';

export default Model.extend({
  members: DS.hasMany('user', {inverse:"groups"}, {async:true}),
  gamesMatched: DS.hasMany('game', {inverse:null}, {async:true})
});
