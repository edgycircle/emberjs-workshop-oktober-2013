DS.FixtureAdapter.reopen({
  queryFixtures: function(records, query) {
    var results = [];

    for (var i = 0; i < records.length; i++) {
      if (!records[i].endedAt) {
        results.push(records[i]);
      }
    }

    return results;
  }
});

App.Project.FIXTURES = [
 {
   id: 1,
   name: 'Workshop Website',
   tasks: [ 11, 12 ]
 },
 {
   id: 2,
   name: 'Zeiterfassungs Tool',
   tasks: [ 21, 22, 23, 24 ]
 },
 {
   id: 3,
   name: 'GitHub Klon',
   tasks: [ 31, 32, 33 ]
 }
];

App.Task.FIXTURES = [
 {
   id: 11,
   name: 'Schreiben',
   timeEntries: [ 11, 12 ],
   project: 1
 },
 {
   id: 12,
   name: 'Designen',
   project: 1
 },
 {
   id: 21,
   name: 'Programmieren',
   timeEntries: [ 13 ],
   project: 2
 },
 {
  id: 22,
  name: 'Scribbeln',
  project: 2
 },
 {
  id: 23,
  name: 'Testen',
  project: 2
 },
 {
  id: 24,
  name: 'Designen',
  project: 2
 },
 {
  id: 31,
  name: 'Anwalt anrufen',
  project: 3
 },
 {
  id: 32,
  name: 'Deployen',
  project: 3
 },
 {
  id: 33,
  name: 'Geld abheben',
  project: 3
 }
];

App.TimeEntry.FIXTURES = [
 {
   id: 11,
   startedAt: new Date(2013, 9, 8, 13, 55).getTime(),
   endedAt: new Date(2013, 9, 8, 14, 20).getTime(),
   task: 11
 },
 {
   id: 12,
   startedAt: new Date(2013, 9, 8, 15, 33).getTime(),
   endedAt: new Date(2013, 9, 8, 15, 59).getTime(),
   task: 11
 },
 {
   id: 13,
   startedAt: new Date().getTime() - 34000,
   endedAt: null,
   task: 21
 }
];
