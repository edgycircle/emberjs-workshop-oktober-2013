App.Task = DS.Model.extend({
  name: DS.attr('string'),
  project: DS.belongsTo('project'),
  timeEntries: DS.hasMany('time_entry', { async: true }),
  overallDuration: function() {
    return this.get('timeEntries').reduce(function(total, timeEntry) {
      return total + timeEntry.get('duration');
    }, 0);
  }.property('timeEntries.@each.duration')
});
