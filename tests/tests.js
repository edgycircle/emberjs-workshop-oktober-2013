App.rootElement = '#app-container';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector) {
  return !!find(selector).length;
}

module("Integration Tests", {
  setup: function() {
    App.reset();
  }
});

test("Create new project", function() {
  var projectName = "Test Projekt " + Math.random();

  visit("/")
  .click("a:contains('Neues Projekt erstellen')")
  .fillIn("form input[type=text]", projectName)
  .click("button:contains('Projekt erstellen')")
  .then(function() {
    ok(exists("*:contains('" + projectName + "')"));
  });
});

module("Unit Tests");

test( "Equality test", function() {
  ok( 1 == "1", "Passed!" );
});
