App.Project = DS.Model.extend({
  name: DS.attr('string'),
  tasks: DS.hasMany('task', { async: true }),
  overallDuration: function() {
    return this.get('tasks').reduce(function(total, task) {
      return total + task.get('overallDuration');
    }, 0);
  }.property('tasks.@each.overallDuration')
});
