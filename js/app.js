App = Ember.Application.create();

// App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://localhost:5000'
});
