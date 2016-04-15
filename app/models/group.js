import Model from 'ember-data/model';

export default Model.extend({
  title: DS.attr(),
  members: DS.hasMany('user', {inverse:"groups"}, {async:true}),
  gameMatched: DS.belongsTo('game', {inverse:null}, {async:true})
});
