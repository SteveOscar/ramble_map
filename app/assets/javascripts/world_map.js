$(document).ready(function(){
    var currentView = "currency"
    var currentYear = gon.percent_one_year
    $(function(){
      $('#' + gon.region).vectorMap({
      map: gon.region + '_mill',
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
                  values: gon.percent_one_year,
                  scale: ['#C8EEFF', '#002333'],
                  min: gon.percent_min,
                  max: gon.percent_max,
                  normalizeFunction: 'linear',
                  // legend: {
                  //           vertical: true,
                  //           title: 'Currency Trends',
                  //           cssClass: 'legend',
                  //         }
                }]
              },
      // Sets the pop-up descriptions when hovering over a country

      onRegionTipShow: function(e, el, code){
        var currentView = "currency";
        var currentYear = gon.percent_one_year;
        dataSet(e, el, code);
      }
      });
      var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');

      var dataSet = function(e, el, code) {
        if (currentView === "currency") {
          if (currentYear[code] > 0) {
            el.html(el.html()+'\'s currency has become '+currentYear[code]+'% cheaper');
          } else if (currentYear[code] < 0) {
            el.html(el.html()+'\'s currency has become '+currentYear[code]*(-1)+'% more expensive');
          } else if (currentYear[code] === 0) {
            el.html(el.html()+'\ uses the same currency');
          } else {
            el.html(el.html() + ' N/A');
          }
        } else if (currentView === "peace") {
            if (gon.peace_index[code] > 3) {
              el.html(el.html()+': highly violent, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] < 3 && gon.peace_index[code][0] >2.5) {
              el.html(el.html()+': violent, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] < 2.5 && gon.peace_index[code][0] >2) {
              el.html(el.html()+': moderately violent, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] < 2  && gon.peace_index[code][0] > 1.6) {
              el.html(el.html()+': average, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] < 1.6  && gon.peace_index[code][0] > 1.35) {
              el.html(el.html()+': peaceful, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] < 1.35  && gon.peace_index[code][0] > 0.1) {
              el.html(el.html()+': very peaceful, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else if (gon.peace_index[code][0] === 1.148) {
              el.html(el.html()+': the most peaceful country on Earth, PeaceRank: '+gon.peace_index[code][1]+'/162');
            } else {
              el.html(el.html() + ': no data');
            }
        } else {
          if (gon.relative_expenses[code]*10 > 4) {
            el.html(el.html()+' is EXTREMELY CHEAP for you');
          } else if (gon.relative_expenses[code]*10 < 4 && gon.relative_expenses[code]*10 >2) {
            el.html(el.html()+' is QUITE CHEAP for you');
          } else if (gon.relative_expenses[code]*10 < 2 && gon.relative_expenses[code]*10 >1.2) {
            el.html(el.html()+' is a LITTLE CHEAPER for you');
          } else if (gon.relative_expenses[code]*10 < 1.2  && gon.relative_expenses[code]*10 > 0.8) {
            el.html(el.html()+' has SIMILAR EXPENSES to your home country');
          } else {
            el.html(el.html() + ' is MORE EXPENSIVE than your country');
          }
        };
      };

      $('#expenses-btn').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-one-year').hide();
        $('#currency-two-years').hide();
        $('#currency-three-years').hide();
        $('#currency-btn').fadeTo('fast', 0.5);
        $('#peace-btn').fadeTo('fast', 0.5);
        $('#expenses-btn').fadeTo('fast', 1);
        r.params.min = gon.expenses_min;
        r.params.max = gon.expenses_max;
        r.setValues(gon.relative_expenses);
        currentView = "expenses";
        dataSet()
      });

      $('#peace-btn').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-btn').fadeTo('fast', 0.5);
        $('#expenses-btn').fadeTo('fast', 0.5);
        $('#peace-btn').fadeTo('fast', 1);
        $('#currency-one-year').fadeTo('fast', 0);
        $('#currency-two-years').fadeTo('fast', 0);
        $('#currency-three-years').fadeTo('fast', 0);
        r.params.min = "1.148";
        r.params.max = "3.645";
        r.setValues(gon.peace_index);
        currentView = "peace";
        dataSet()
      });

      $('#currency-btn').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-one-year').fadeTo('fast', 1);
        $('#currency-two-years').fadeTo('fast', 0.5);
        $('#currency-three-years').fadeTo('fast', 0.5);
        $('#peace-btn').fadeTo('fast', 0.5);
        $('#expenses-btn').fadeTo('fast', 0.5);
        $('#currency-btn').fadeTo('fast', 0);
        r.params.min = gon.percent_min;
        r.params.max = gon.percent_max;
        r.setValues(gon.percent_one_year);
        currentView = "currency";
        dataSet()
      });

      $('#currency-one-year').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-one-year').fadeTo('fast', 1);
        $('#currency-two-years').fadeTo('fast', 0.5);
        $('#currency-three-years').fadeTo('fast', 0.5);
        $('#currency-btn').fadeTo('fast', 0);
        $('#peace-btn').fadeTo('fast', 0.5);
        r.params.min = gon.percent_min;
        r.params.max = gon.percent_max;
        r.setValues(gon.percent_one_year);
        currentYear = gon.percent_one_year;
        currentView = "currency";
        dataSet()
      });

      $('#currency-two-years').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-two-years').fadeTo('fast', 1);
        $('#currency-one-year').fadeTo('fast', 0.5);
        $('#currency-three-years').fadeTo('fast', 0.5);
        $('#currency-btn').fadeTo('fast', 0);
        $('#peace-btn').fadeTo('fast', 0.5);
        r.params.min = gon.percent_min;
        r.params.max = gon.percent_max;
        r.setValues(gon.percent_two_years);
        currentYear = gon.percent_two_years;
        currentView = "currency";
        dataSet()
      });

      $('#currency-three-years').on('click', function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r=mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        $('#currency-three-years').fadeTo('fast', 1);
        $('#currency-two-years').fadeTo('fast', 0.5);
        $('#currency-one-year').fadeTo('fast', 0.5);
        $('#currency-btn').fadeTo('fast', 0);
        $('#peace-btn').fadeTo('fast', 0.5);
        r.params.min = gon.percent_min;
        r.params.max = gon.percent_max;
        r.setValues(gon.percent_three_years);
        currentYear = gon.percent_three_years;
        currentView = "currency";
        dataSet()
      });
    })
});
