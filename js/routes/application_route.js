App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('sidebar').set('tasks', this.store.find('task'));
    this.controllerFor('sidebar').set('projects', this.store.find('project'));
    this.controllerFor('sidebar').set('timeEntries', this.store.find('timeEntry'));

    var self = this;
    this.store.find('timeEntry', { endedAt: null }).then(function(array) {
      self.controllerFor('sidebar').set('activeTimeEntry', array.get('firstObject'));
    });
  }
});
