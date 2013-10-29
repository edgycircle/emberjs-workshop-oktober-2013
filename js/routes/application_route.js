App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    var controller = this.controllerFor('sidebar');

    controller.set('tasks', this.store.find('task'));
    controller.set('projects', this.store.find('project'));
    controller.set('timeEntries', this.store.find('timeEntry'));

    App.TimeEntry.findActive().then(function(timeEntry) {
      controller.set('activeTimeEntry', timeEntry);
    });
  }
});
