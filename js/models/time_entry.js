App.TimeEntry = DS.Model.extend({
  startedAt: DS.attr('number'),
  endedAt: DS.attr('number'),
  task: DS.belongsTo('task'),
  intervalId: null,
  virtualEndedAt: null,

  init: function() {
    this._super();

    this.one('didLoad', function() {
      if (this.get('startedAt') > 0 && !this.get('endedAt') && !this.get('intervalId')) {
        this.startInterval();
      }
    });
  },

  duration: function() {
    var startedAt = this.get('startedAt');
    var endedAt = this.get('endedAt');
    var virtualEndedAt = this.get('virtualEndedAt');

    if (startedAt > 0 && endedAt > 0) {
      return endedAt - startedAt;
    }

    if (startedAt > 0 && virtualEndedAt > 0) {
      return virtualEndedAt - startedAt;
    }

    return 0;
  }.property('startedAt', 'endedAt', 'virtualEndedAt'),

  startedAtChanged: function() {
    if (this.get('startedAt') > 0 && !this.get('endedAt') && !this.get('intervalId')) {
      this.startInterval();
    }
  }.observes('startedAt'),

  endedAtChanged: function() {
    if (this.get('endedAt') > 0) {
      this.clearInterval();
    }
  },

  startInterval: function() {
    this.stopInterval();

    var self = this;
    var intervalId = setInterval(function() {
      self.set('virtualEndedAt', new Date().getTime());
    }, 1000);

    this.set('intervalId', intervalId);
    this.set('virtualEndedAt', new Date().getTime());
  },

  stopInterval: function() {
    clearInterval(this.get('intervalId'));
  },

  willDestroy: function() {
    this.stopInterval();
    this._super();
  }
});
