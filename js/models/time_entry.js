App.TimeEntry = DS.Model.extend({
  startedAt: DS.attr('number'),
  endedAt: DS.attr('number'),
  task: DS.belongsTo('task'),
  intervalId: null,
  secondsSinceStartedAt: null,
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
    var self = this;
    var intervalId = setInterval(function() {
      var startedAt = self.get('startedAt');

      if (startedAt) {
        self.set('secondsSinceStartedAt', Math.floor((new Date().getTime() - startedAt) / 1000));
      }
    }, 1000);

    this.set('intervalId', intervalId);
  },
  stopInterval: function() {
    clearInterval(this.get('intervalId'));
  },
  willDestroy: function() {
    this.stopInterval();
    this._super();
  }
});
