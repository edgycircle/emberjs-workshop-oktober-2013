App = Ember.Application.create();

App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://localhost:5000'
  // host: 'http://der-zeitverkaeufer-api.herokuapp.com'
});
