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
   timeEntries: [ 11 ]
 },
 {
   id: 12,
   name: 'Designen'
 },
 {
   id: 21,
   name: 'Programmieren',
   timeEntries: [ 12 ]
 },
 {
  id: 22,
  name: 'Scribbeln'
 },
 {
  id: 23,
  name: 'Testen'
 },
 {
  id: 24,
  name: 'Designen'
 },
 {
  id: 31,
  name: 'Anwalt anrufen'
 },
 {
  id: 32,
  name: 'Deployen'
 },
 {
  id: 33,
  name: 'Geld abheben'
 }
];

App.TimeEntry.FIXTURES = [
 {
   id: 11,
   startedAt: new Date(2013, 9, 8, 13, 55),
   endedAt: new Date(2013, 9, 8, 14, 20)
 },
 {
   id: 12,
   startedAt: new Date(2013, 9, 8, 15, 33),
   endedAt: new Date(2013, 9, 8, 15, 59)
 }
];
