App.rootElement = '#app-container';
App.setupForTesting();
App.injectTestHelpers();

// QUnit.begin(function() {
//   Ember.run(function() {
//     App.advanceReadiness();
//   });
// });

// QUnit.testStart(function() {
//   Ember.run(function() {
//     App.reset();
//   });

//   Ember.testing = true;
// });

// QUnit.testDone(function() {
//   Ember.testing = false;
// });

function exists(selector) {
  return !!find(selector).length;
}

module("Integration Tests", {
  setup: function() {
    App.reset();
  }
});

test("Create new project", function() {
  visit("/")
  .click("a:contains('Neues Projekt erstellen')")
  .fillIn("input[type=text]", "Test Projekt")
  .click("button")
  .then(function() {
    ok(exists("*:contains('Test Projekt')"));
  });
});

module("Unit Tests");

test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});
