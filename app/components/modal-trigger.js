import Ember from 'ember';

export default Ember.Component.extend({
  modalIsOpen: false,
  logInButton: false,
  signUpButton: false,

  actions: {
    openModal(button){
      this.set(button, true);
      this.set('modalIsOpen', true);
    },
    closeModal(){
      this.set('logInButton', false);
      this.set('signUpButton', false);
      this.set('modalIsOpen', false);
    },
    signIn(){
      this.sendAction('signIn');
    },
    newUser(params){
      this.sendAction('newUser', params);
    }
  }
});
