App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('sidebar').set('model', this.store.find('task'));
    this.controllerFor('sidebar').set('projects', this.store.find('project'));
  }
});
