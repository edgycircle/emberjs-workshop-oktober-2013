App.SidebarController = Ember.Controller.extend({
  matchingTasks: null, //suggestedTasks
  task: null,
  searchTerm: '', // nix doppelt nur hier

  disableCreateAndWorkOnTaskButton: function() {
    return this.get('searchTerm').length == 0 || !this.get('selectedProject');
  }.property('selectedProject', 'searchTerm'),

  actions: {
    inputChanged: function(searchTerm) {
      console.log("inputChanged", searchTerm);
      this.set('searchTerm', searchTerm);

      if (searchTerm.length < 1) {
        return this.set('matchingTasks', null);
      }

      var regex = new RegExp(searchTerm, 'i');

      var filteredTasks = this.get('model').filter(function(task) {
        return task.get('name').match(regex);
      });

      this.set('matchingTasks', filteredTasks)
    },
    suggestedTaskSelected: function(task) {
      console.log("suggestedTaskSelected");
      this.set('task', task);
      this.set('selectedProject', null);
      this.set('matchingTasks', null);
    },
    workOnTask: function() {
      console.log("workOnTask");

      var timeEntry = this.store.createRecord('timeEntry');
      var task = this.get('task');

      timeEntry.set('startedAt', new Date().getTime());
      timeEntry.set('task', task);
      timeEntry.save();

      task.get('timeEntries').pushObject(timeEntry);

      this.set('timeEntry', timeEntry);
      this.set('task', null);
    },
    createAndWorkOnTask: function() {
      console.log("createAndWorkOnTask");

      var task = this.store.createRecord('task');
      var timeEntry = this.store.createRecord('timeEntry');

      task.set('project', this.get('selectedProject'));
      task.set('name', this.get('searchTerm'));

      timeEntry.set('startedAt', new Date().getTime());
      timeEntry.set('task', task);

      timeEntry.save().then(function(savedTimeEntry) {
        savedTimeEntry.get('task').get('timeEntries').pushObject(savedTimeEntry);
        savedTimeEntry.get('task').get('project').get('tasks').pushObject(savedTimeEntry.get('task'));
      });

      this.set('timeEntry', timeEntry);
      this.set('searchTerm', '');
      this.set('selectedProject', null);
      this.set('matchingTasks', null);
    },
    deselectTask: function() {
      this.set('task', null);
    },
    stopWorking: function() {
      var timeEntry = this.get('timeEntry');

      timeEntry.set('endedAt', new Date().getTime());
      timeEntry.save();

      this.set('timeEntry', null);
    }
  }
});

App.AutosuggestView = Ember.View.extend({
  templateName: 'autosuggest',
  searchTerm: null,
  searchTextField: Ember.TextField.extend({
    keyUp: function(event) {
      this.get('parentView.controller').send('inputChanged', this.get('parentView.searchTerm'));
    }
  })
});
