// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-jvectormap-2.0.1.min
//= require jquery-jvectormap-world-mill
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
  $('#blank-map').delay( 300 ).fadeTo('slow', 0.7);
  $('.circle').delay( 1500 ).fadeTo('slow', 0.9);
  $('#globe').delay( 1500 ).fadeTo('slow', 0.9);
  $('.left-card').delay( 100 ).slideDown( 1000, function() {
    // Animation complete.
  });
  $('.right-card').delay( 100 ).slideDown( 1500, function() {
    // Animation complete.
  });
  $('.top-banner').delay( 100 ).slideDown( 2000, function() {
  });
  $('.background-banner').delay( 100 ).slideDown( 2000, function() {
  });
  $('.headline').delay( 2000 ).fadeTo('slow', 0.9);
  $('.perspective').delay( 1800 ).fadeTo('slow', 0.9).delay( 700 ).fadeTo('fast', 0);
  $('.country').delay( 3100 ).fadeTo('slow', 0.9);

  // Potential code for selection box reaction
  // $('.selectChange').change(function() {
  //   updateAllCSS($(this).attr('data-element'), $(this).attr('data-property'), $(this).val() + $(this).attr('data-unit'))
  // });
});
