App.ProjectsNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('project');
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
