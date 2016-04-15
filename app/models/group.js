import Model from 'ember-data/model';

export default Model.extend({
  title: DS.attr(),
  members: DS.hasMany('user', {inverse:"groups"}, {async:true}),
  gamesMatched: DS.belongsTo('game', {inverse:null}, {async:true})
});
