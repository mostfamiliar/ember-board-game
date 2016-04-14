import Ember from 'ember';

export default Ember.Component.extend({
  whoAmI: Ember.inject.service(),
  showDistance: false,
  findUser: null,
  userList: Ember.computed('users', function(){
    for(var i = 0; i <= this.get('users.length'); i++) {
       var eachUser = this.get('users').objectAt(i);
             this.set('findUser', eachUser);
            console.log(eachUser);


    }
                return eachUser;
  }),
  actions: {
    showDistance(){
      this.set('showDistance', true);
    }
  }
});
