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
   startedAt: new Date(2013, 9, 8, 13, 55),
   endedAt: new Date(2013, 9, 8, 14, 20),
   task: 11
 },
 {
   id: 12,
   startedAt: new Date(2013, 9, 8, 15, 33),
   endedAt: new Date(2013, 9, 8, 15, 59),
   task: 11
 },
 {
   id: 13,
   startedAt: new Date(2013, 9, 8, 17, 23),
   endedAt: new Date(2013, 9, 8, 18, 12),
   task: 21
 }
];
