$(document).ready(function(){
  // Welcome Page
  $('#blank-map').delay( 300 ).fadeTo('slow', 0.7);
  $('.circle').delay( 1500 ).fadeTo('slow', 0.9);
  $('#globe').delay( 1500 ).fadeTo('slow', 0.9);
  $('#glass').delay(1500).fadeTo('slow', 1);
  $('#twitter-signin').delay(1500).fadeTo('slow', 1);
  $('#twitter-signout').delay(1500).fadeTo('slow', 1);
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
  $('.perspective').fadeTo('fast', 0.9).delay( 1300 ).fadeTo('slow', 0);
  $('.country').delay( 1000 ).fadeTo('slow', 0.9).delay( 1400 ).fadeTo('slow', 0);
  $('.main-map').delay( 3100 ).fadeTo('slow', 1);
  $('#map-headline').delay(3100).fadeTo('slow', 1);
  $('#price-legend').delay(3100).fadeTo('slow', 1);

  // Map Button setup
  $('#expenses-btn').delay( 3100 ).fadeTo('slow', 0.5);
  $('#peace-btn').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-one-year').delay( 3100 ).fadeTo('slow', 0.9);
  $('#currency-two-years').delay( 3300 ).fadeTo('slow', 0.5);
  $('#currency-three-years').delay( 3500 ).fadeTo('slow', 0.5);
  $('#sources-btn').delay(3600).fadeTo('slow', 0.5);
  $('#stats-btn').delay(3600).fadeTo('slow', 0.5);
  $('#tweet-btn').delay(3600).fadeTo('slow', 0.7);

  // Sources, Tweet and Report Elements
  $('#tweet-btn').on('click', function() {
    $('#tweet-card').toggle();
  });
  $('#tweet-bird').on('click', function() {
    $('#tweet-card').hide();
    $('#tweeted').show();
    $('#tweet-btn').hide();
  });
  $('#dead-bird').on('click', function() {
    $('#tweet-card').toggle();
  });
  $('#sources-btn').on('click', function() {
    $('#sources-card').toggle();
    $('#stats-card').hide();
  });
  $('#sources-card').on('click', function() {
    $('#sources-card').hide();
  });
  $('#stats-btn').on('click', function() {
    $('#stats-card').toggle();
    $('#sources-card').hide();
    $('#price-legend').hide();
    $('#peace-legend').hide();
    $('#hidden-legend').show();
  });
  $('#stats-card').on('click', function() {
    $('#stats-card').hide();
  });

  // Legends
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

  // Map button behaviors
  $('#peace-btn').on('click', function() {
    $('#price-legend').hide();
    $('#peace-legend').show();
    $('#hidden-legend').hide();
    $('#currency-btn').fadeTo('fast', 0.5);
    $('#expenses-btn').fadeTo('fast', 0.5);
    $('#peace-btn').fadeTo('fast', 1);
    $('#currency-one-year').fadeTo('fast', 0);
    $('#currency-two-years').fadeTo('fast', 0);
    $('#currency-three-years').fadeTo('fast', 0);
  });

  $('#expenses-btn').on('click', function() {
    currencyBehavior();
    $('#currency-one-year').hide();
    $('#currency-two-years').hide();
    $('#currency-three-years').hide();
    $('#currency-btn').fadeTo('fast', 0.5);
    $('#expenses-btn').fadeTo('fast', 1);
  });

  $('#currency-btn').on('click', function() {
    currencyBehavior();
    $('#currency-one-year').fadeTo('fast', 1);
    $('#currency-two-years').fadeTo('fast', 0.5);
    $('#currency-three-years').fadeTo('fast', 0.5);
    $('#expenses-btn').fadeTo('fast', 0.5);
    $('#currency-btn').fadeTo('fast', 0);
  });

  $('#currency-one-year').on('click', function() {
    currencyBehavior();
    $('#currency-one-year').fadeTo('fast', 1);
    $('#currency-two-years').fadeTo('fast', 0.5);
    $('#currency-three-years').fadeTo('fast', 0.5);
    $('#currency-btn').fadeTo('fast', 0);
  });

  $('#currency-two-years').on('click', function() {
    currencyBehavior();
    $('#currency-two-years').fadeTo('fast', 1);
    $('#currency-one-year').fadeTo('fast', 0.5);
    $('#currency-three-years').fadeTo('fast', 0.5);
    $('#currency-btn').fadeTo('fast', 0);
  });

  $('#currency-three-years').on('click', function() {
    currencyBehavior();
    $('#currency-three-years').fadeTo('fast', 1);
    $('#currency-two-years').fadeTo('fast', 0.5);
    $('#currency-one-year').fadeTo('fast', 0.5);
    $('#currency-btn').fadeTo('fast', 0);
  });

  var currencyBehavior = function() {
    $('#price-legend').show();
    $('#peace-legend').hide();
    $('#hidden-legend').hide();
    $('#peace-btn').fadeTo('fast', 0.5);
  }

});
