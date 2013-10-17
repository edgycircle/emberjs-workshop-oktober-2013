Ember.Handlebars.helper('time', function(value, options) {
  var remainder = Math.floor(value / 1000);
  var hours = Math.floor(remainder / (60 * 60));
  remainder = remainder % (60 * 60);
  var minutes = Math.floor(remainder / 60);
  var seconds = remainder % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  return new Handlebars.SafeString("%@:%@:%@".fmt(hours, minutes, seconds));
});
