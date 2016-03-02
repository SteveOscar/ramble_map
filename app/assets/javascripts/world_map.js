$(document).ready(function(){

  $(function(){
    $('#world').vectorMap({
    map: 'world_mill',
    backgroundColor: ['transparent'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'white',
                    "stroke-width": 0.4,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.2,
                    stroke: 'red',
                    "stroke-width": 2,
                    cursor: 'pointer'
                  },
                  selected: {
                    fill: 'red'
                  },
                  selectedHover: {
                  }
                },
    series: {
              regions: [{
                values: gon.percent,
                scale: ['#C8EEFF', '#0071A4'],
                min: -15,
                max: 50,
                normalizeFunction: 'linear'
              }]
            },
    // Sets the pop-up descriptions when hovering over a country
    onRegionTipShow: function(e, el, code){
      if (gon.percent[code] > 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]+'% cheaper');
      } else if (gon.percent[code] < 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]*(-1)+'% more expensive');
      } else if (gon.percent[code] === 0) {
        el.html(el.html()+'\ uses the same currency');
      } else {
        el.html(el.html() + ' N/A');
      }
    }
    });
    var mapObject = $('#world').vectorMap('get', 'mapObject');

    $('#prices-btn').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = 0.1;
      r.params.max = 0.5;
      r.setValues(gon.relative_prices);
    });

    $('#currency-btn').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = -15;
      r.params.max = 50;
      r.setValues(gon.percent);
    });
  })

});

// if (gon.relative_prices[code]*10 > 4) {
//   el.html(el.html()+' is very cheap for you');
// } else if (gon.relative_prices[code]*10 < 4 && gon.relative_prices[code]*10 >1.5) {
//   el.html(el.html()+' is fairly fairly cheap for you');
// } else if (gon.relative_prices[code]*10 < 1.5  && gon.relative_prices[code]*10 > 0.9) {
//   el.html(el.html()+' has prices similar to your home country');
// } else {
//   el.html(el.html() + ' is more expensive than your country');
// }

// $(".slider").slider({
//   value: val,
//   min: 2013,
//   max: 2015,
//   step: 1,
//   slide: function( event, ui ) {
//     val = ui.value;
//     mapObject.series.regions[0].setValues(gon.test);
//   }
// });
