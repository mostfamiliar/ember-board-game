import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteGroup(group){
      if(confirm('Are you sure you want to delete this group?')){
        this.sendAction('deleteGroup', group);  
      }
    }
  }
});
