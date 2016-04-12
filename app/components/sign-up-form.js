import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signUp(){
      var params = {
        username: this.get('username'),
        password: this.get('password'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        address: this.get('address'),
        email: this.get('email')
      };
      // this.set('username', '');
      // this.set('password', '');
      // this.set('firstName', '');
      // this.set('lastName', '');
      // this.set('address', '');
      // this.set('email', '');
      console.log(params);
      this.sendAction('newUser', params);
    }
  }
});
