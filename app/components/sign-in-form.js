import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),

  actions: {
    signIn() {
      var params = {
        username: this.get('usernameLogin'),
        password: this.get('passwordLogin'),
      };
      var matched = false;
      var currentUser = this.get('whoAmI');
      this.allUsers.forEach(function(user){
        if(user.get('username') === params.username && user.get('password') === params.password){
          console.log(currentUser.get('user'));
          console.log(user);
          currentUser.logIn(user);
          matched = true;
        }
      });
      if(!matched){
        alert('Not a valid login combination'); // to change???
      } else {
        alert(currentUser.get('user').get('username') + ' is logged in');
        this.sendAction('signIn', currentUser.get('user').get('id'));
      }
    }
  }
});
