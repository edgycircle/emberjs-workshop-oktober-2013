$(document).ready(function() {
  $('body').on('click', '.dropdown-toggle', function(event) {
    $(this).next('.dropdown-menu').slideToggle(200);
  });

  $('body').on('click', '.dropdown-menu li', function(event) {
    $(this).parent('.dropdown-menu').slideToggle(200);

    var $dropdown = $(this).closest('.dropdown');
    var $dropdownToggle = $dropdown.find('.dropdown-toggle');

    var dropdownLabel = $(this).text();
    var dropdownValue = $(this).data('value');
    var that = this;

    $dropdown.find('.dropdown-toggle label').first().removeClass('default-value').text(dropdownLabel);

    $('select').first().val(dropdownValue);
    $('select').trigger('change');
  });
});
