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
  // Welcome Page
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

  // Map Intro
  $('.background-banner').delay( 3100 ).fadeTo('slow', 0.5);
  $('.headline').delay( 2000 ).fadeTo('slow', 0.9);
  $('.perspective').delay( 200 ).fadeTo('slow', 0.9).delay( 1300 ).fadeTo('slow', 0);
  $('.country').delay( 1200 ).fadeTo('slow', 0.9).delay( 2300 ).fadeTo('slow', 0);;
  // Map Buttons
  $('#expenses-btn').delay( 3100 ).fadeTo('slow', 0.5);
  $('#peace-btn').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-one-year').delay( 3100 ).fadeTo('slow', 0.9);
  $('#currency-two-years').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-three-years').delay( 3500 ).fadeTo('slow', 0.5);

  $('.main-map').delay( 3100 ).fadeTo('slow', 1);
  $('#map-headline').delay(3100).fadeTo('slow', 1);


});
