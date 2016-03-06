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
  $('.perspective').fadeTo('slow', 0.9).delay( 1300 ).fadeTo('slow', 0);
  $('.country').delay( 1200 ).fadeTo('slow', 0.9).delay( 2300 ).fadeTo('slow', 0);;
  // Map Buttons
  $('#expenses-btn').delay( 3100 ).fadeTo('slow', 0.5);
  $('#peace-btn').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-one-year').delay( 3100 ).fadeTo('slow', 0.9);
  $('#currency-two-years').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-three-years').delay( 3500 ).fadeTo('slow', 0.5);

  $('#sources-btn').delay(3600).fadeTo('slow', 0.7)
  $('#stats-btn').delay(3600).fadeTo('slow', 0.7)
  $('.main-map').delay( 3100 ).fadeTo('slow', 1);
  $('#map-headline').delay(3100).fadeTo('slow', 1);
  $('#price-legend').delay(3100).fadeTo('slow', 1);

  $('#sources-btn').on('click', function() {
    $('#sources-card').toggle();
  });
  $('#sources-card').on('click', function() {
    $('#sources-card').hide();
  });

  $('#stats-btn').on('click', function() {
    $('#stats-card').toggle();
  });
  $('#stats-card').on('click', function() {
    $('#stats-card').hide();
  });

  $('#price-legend').on('click', function() {
    $('#price-legend').toggle();
    $('#hidden-legend').toggle();
  });
  $('#hidden-legend').on('click', function() {
    $('#price-legend').toggle();
    $('#hidden-legend').toggle();
  });
  $('#peace-legend').on('click', function() {
    $('#peace-legend').toggle();
    $('#hidden-legend').toggle();
  });

  $('#peace-btn').on('click', function() {
    $('#price-legend').hide();
    $('#peace-legend').show();
    $('#hidden-legend').hide();
  });

  $('#expenses-btn').on('click', function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
  });

  $('#currency-btn').on('click', function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
  });

  $('#currency-one-year').on('click', function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
  });

  $('#currency-two-years').on('click', function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
  });

  $('#currency-three-years').on('click', function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
  });

});
