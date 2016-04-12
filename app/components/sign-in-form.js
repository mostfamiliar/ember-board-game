import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signIn() {
      var params = {
        username: this.get('usernameLogin'),
        password: this.get('passwordLogin'),
      };
      this.sendAction('signIn', params);
    }
  }
});
