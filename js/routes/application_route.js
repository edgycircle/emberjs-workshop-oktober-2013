App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('sidebar').set('tasks', this.store.find('task'));
    this.controllerFor('sidebar').set('projects', this.store.find('project'));
    this.controllerFor('sidebar').set('timeEntries', this.store.find('timeEntry'));

    var self = this;
    App.TimeEntry.findActive().then(function(timeEntry) {
      self.controllerFor('sidebar').set('activeTimeEntry', timeEntry);
    });
  }
});
