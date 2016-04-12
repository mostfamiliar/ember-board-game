import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('profile', {path:'/profile/:username'});
  this.route('group');
});

export default Router;
