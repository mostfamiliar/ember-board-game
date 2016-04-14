import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  hostValue: false,
  bggMember: true,
  hideProfile: true,

  user: Ember.computed('whoAmI', function(){
    return this.get('whoAmI').get('user');
  }),

  actions: {
    formShow(){
      this.toggleProperty('hideProfile');
    },
    editProfile(){
      var params = {
        username: this.get('user.username'),
        password: this.get('user.password'),
        firstName: this.get('user.firstName'),
        lastName: this.get('user.lastName'),
        address: this.get('user.address'),
        email: this.get('user.email'),
        host: this.get('hostValue'),
        lat: '90', //to change
        lng: '90', //to change
        notes: this.get('user.notes')
      };
      console.log(params);
      this.sendAction('updateProfile', params);
    }
  }
});
