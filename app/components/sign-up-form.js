import Ember from 'ember';

export default Ember.Component.extend({
  hostValue: false,
  bggMember: true,

  actions: {
    signUp(){
      var params = {
        username: this.get('username'),
        password: this.get('password'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        address: this.get('address'),
        email: this.get('email'),
        host: this.get('hostValue'),
        lat: '90', //to change
        lng: '90', //to change
        notes: ''
      };
      var member = this.get('bggMember');
      this.set('username', '');
      this.set('password', '');
      this.set('firstName', '');
      this.set('lastName', '');
      this.set('address', '');
      this.set('email', '');
      console.log(params);
      console.log(member);
      this.sendAction('newUser', params, member);
    }
  }
});
