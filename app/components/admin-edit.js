import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),

  user: Ember.computed('whoAmI', function(){
    return this.get('whoAmI').get('user');
  })
});
