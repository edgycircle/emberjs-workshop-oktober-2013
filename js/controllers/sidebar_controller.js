App.SidebarController = Ember.Controller.extend({
  selectedTask: null,
  selectedProject: null,
  activeTimeEntry: null,
  inputValue: '',

  mostRecentTasks: function() {
    var timeEntries = this.get('timeEntries');

    return timeEntries.toArray().sort(function(a, b) {
      if (a.get('endedAt') == null) {
        return -1;
      }

      if (b.get('endedAt') == null) {
        return 1;
      }

      return a.get('endedAt') >= b.get('endedAt') ? -1 : 1;
    }).map(function(timeEntry) {
      return timeEntry.get('task');
    }).uniq().slice(0, 5);
  }.property('timeEntries.@each'),

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
      this.set('selectedTask', task);
      this.set('selectedProject', null);
      this.set('inputValue', '');
    },
    workOnTask: function() {
      var timeEntry = this.store.createRecord('timeEntry');
      var task = this.get('selectedTask');

      timeEntry.set('startedAt', new Date().getTime());
      timeEntry.set('task', task);
      timeEntry.save();

      task.get('timeEntries').pushObject(timeEntry);

      this.set('activeTimeEntry', timeEntry);
      this.set('selectedTask', null);
    },
    workOn: function(task) {
      if (this.get('activeTimeEntry')) {
        this.send('stopWorking');
      }

      var timeEntry = this.store.createRecord('timeEntry');

      timeEntry.set('startedAt', new Date().getTime());
      timeEntry.set('task', task);
      timeEntry.save();

      task.get('timeEntries').pushObject(timeEntry);

      this.set('activeTimeEntry', timeEntry);
      this.set('selectedTask', null);
      this.set('inputValue', '');
      this.set('selectedProject', null);
      this.set('matchingTasks', null);
    },
    createAndWorkOnTask: function() {
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

      this.set('activeTimeEntry', timeEntry);
      this.set('inputValue', '');
      this.set('selectedProject', null);
      this.set('matchingTasks', null);
    },
    deselectTask: function() {
      this.set('selectedTask', null);
    },
    stopWorking: function() {
      var timeEntry = this.get('activeTimeEntry');

      timeEntry.set('endedAt', new Date().getTime());
      timeEntry.save();

      this.set('activeTimeEntry', null);
    }
  }
});
