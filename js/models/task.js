App.Task = DS.Model.extend({
  name: DS.attr('string'),
  project: DS.belongsTo('project'),
  timeEntries: DS.hasMany('time_entry', { async: true })
});
