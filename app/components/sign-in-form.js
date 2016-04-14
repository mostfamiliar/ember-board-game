import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),

  actions: {
    closeModal(){
      this.sendAction('closeModal');
    },

    signIn() {
      var params = {
        username: this.get('usernameLogin'),
        password: this.get('passwordLogin'),
      };
      var matched = false;
      var currentUser = this.get('whoAmI');
      this.allUsers.forEach(function(user){
        if(user.get('username') === params.username && user.get('password') === params.password){
          currentUser.logIn(user);
          matched = true;
        }
      });
      if(!matched){
        alert('Not a valid login combination'); // to change???
      } else {
        this.sendAction('signIn');
      }
    }
  }
});
