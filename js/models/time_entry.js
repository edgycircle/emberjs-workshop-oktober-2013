// hasEnded()
// keepDurationAccurate()
// isIntervalActive() ?
// startInterval() ?
// _ private methods


App.TimeEntry = DS.Model.extend({
  startedAt: DS.attr('date'),
  endedAt: DS.attr('date'),
  task: DS.belongsTo('task'),
  intervalId: null,
  virtualEndedAt: null,

  init: function() {
    this._super();

    this.one('didLoad', function() {
      if (this.get('startedAt') && !this.get('endedAt') && !this.get('intervalId')) {
        this.startInterval();
      }
    });
  },

  // hasEnded: function() {
  //   return this.get('startedAt').getTime() > 0 && this.get('endedAt').getTime() > 0;
  // },

  duration: function() {
    var startedAt = this.get('startedAt');
    var endedAt = this.get('endedAt');
    var virtualEndedAt = this.get('virtualEndedAt');

    if (startedAt && endedAt) {
      return endedAt.getTime() - startedAt.getTime();
    }

    if (startedAt && virtualEndedAt) {
      return virtualEndedAt.getTime() - startedAt.getTime();
    }

    return 0;
  }.property('startedAt', 'endedAt', 'virtualEndedAt'),

  startedAtChanged: function() {
    if (this.get('startedAt') && !this.get('endedAt') && !this.get('intervalId')) {
      this.startInterval();
    }
  }.observes('startedAt'),

  endedAtChanged: function() {
    if (this.get('endedAt')) {
      this.stopInterval();
    }
  }.observes('endedAt'),

  startInterval: function() {
    this.stopInterval();

    var self = this;
    var intervalId = setInterval(function() {
      self.set('virtualEndedAt', new Date());
    }, 1000);

    this.set('intervalId', intervalId);
    this.set('virtualEndedAt', new Date());
  },

  stopInterval: function() {
    clearInterval(this.get('intervalId'));
  },

  willDestroy: function() {
    this.stopInterval();
    this._super();
  }
});

App.TimeEntry.reopenClass({
  findActive: function() {
    var url = this.store.adapterFor('timeEntry').buildURL('timeEntry') + '/active';
    var self = this;

    return Ember.$.ajax({
      url: url,
      type: 'GET'
    }).then(function(response) {
      if (response && response.time_entry) {
        return self.store.push('timeEntry', {
          id: response.time_entry.id,
          startedAt: new Date(response.time_entry.started_at),
          endedAt: null,
          task: response.time_entry.task_id
        });
      } else {
        return null;
      }
    });
  }
});
