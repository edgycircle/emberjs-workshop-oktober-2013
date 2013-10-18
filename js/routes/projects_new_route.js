App.ProjectsNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('project');
  },
  deactivate: function() {
    if (this.currentModel.get('isNew')) {
      this.currentModel.deleteRecord()
    }
  },
  actions: {
    createProject: function() {
      var self = this;

      this.modelFor('projectsNew').save().then(function() {
        self.transitionTo('projects');
      });
    }
  }
});
