import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('profile', {path:'/profile/:username'});
  this.route('group', {path: '/group/:group_id'});
  this.route('user', {path:'/user/:user_id'});
  this.route('admin');
  this.route('browse');
});

export default Router;
