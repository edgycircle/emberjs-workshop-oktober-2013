App.Router.map(function() {
  this.resource('projects', { path: 'projekte' } )
  this.resource('tasks', { path: 'aufgaben' } )
  this.resource('time_entries', { path: 'zeit-eintraege' } )
});
