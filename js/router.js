App.Router.map(function() {
  this.resource('projects', { path: 'projekte' } );
  this.resource('project', { path: 'projekte/:project_id' } );
  this.route('projects.new', { path: 'projekte/erstellen' });
});
