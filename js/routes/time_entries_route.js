App.TimeEntriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('timeEntry');
  }
});
