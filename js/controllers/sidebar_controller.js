App.SidebarController = Ember.Controller.extend({
  selectedTask: null,
  selectedProject: null,
  activeTimeEntry: null,
  inputValue: '',
  task: null,

  suggestedTasks: function() {
    var inputValue = this.get('inputValue');

    if (inputValue.length == 0) {
      return [];
    }

    var regex = new RegExp(inputValue, 'i');

    return this.get('tasks').filter(function(task) {
      return task.get('name').match(regex);
    });
  }.property('inputValue'),

  disableCreateAndWorkOnTaskButton: function() {
    return this.get('inputValue').length == 0 || !this.get('selectedProject');
  }.property('selectedProject', 'inputValue'),

  actions: {
    suggestedTaskSelected: function(task) {
      console.log("suggestedTaskSelected");
      this.set('task', task);
      this.set('selectedProject', null);
      this.set('inputValue', '');
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
      task.set('name', this.get('inputValue'));

      timeEntry.set('startedAt', new Date().getTime());
      timeEntry.set('task', task);

      timeEntry.save().then(function(savedTimeEntry) {
        savedTimeEntry.get('task').get('timeEntries').pushObject(savedTimeEntry);
        savedTimeEntry.get('task').get('project').get('tasks').pushObject(savedTimeEntry.get('task'));
      });

      this.set('timeEntry', timeEntry);
      this.set('inputValue', '');
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
