App.TimeEntry = DS.Model.extend({
  startedAt: DS.attr('date'),
  endedAt: DS.attr('date'),
  task: DS.belongsTo('task')
});
