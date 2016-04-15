import Model from 'ember-data/model';

export default Model.extend({
  members: DS.hasMany('user', {inverse:"groups"}, {async:true}),
  gamesMatched: DS.belongsTo('game', {inverse:null}, {async:true})
});
