$(document).ready(function(){
    var currentView = "currency"
    var currentYear = gon.percent_one_year
    $(function(){
      $('#' + gon.region).vectorMap({
      map: gon.region + '_mill',
      backgroundColor: ['transparent'],
      regionsSelectable: true,
      regionsSelectableOne: true,
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
                      fill: 'white',
                      "fill-opacity": 0.2,
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
                  }]
                },
      // Sets the dataset pop-up descriptions when hovering over a country
      onRegionTipShow: function(e, el, code){
        var currentView = "currency";
        var currentYear = gon.percent_one_year;
        dataSet(e, el, code);
      }
      });
      var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
      // Generates content of on-hover label over regions
      var dataSet = function(e, el, code) {
        if (currentView === "currency") {
          if (currentYear[code] > 0) {
            el.html(el.html()+': currency has become \n'+currentYear[code]+'% weaker against that of: '+gon.country);
          } else if (currentYear[code] < 0) {
            el.html(el.html()+': currency has become \n'+currentYear[code]*(-1)+'% stronger against that of: '+gon.country);
          } else if (currentYear[code] === 0) {
            el.html(el.html()+' uses the same currency');
          } else {
            el.html(el.html() + ' N/A');
          }
        } else if (currentView === "peace") {
            if (gon.peace_index[code][0] > 3) {
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
          if (isNaN(gon.relative_expenses[code])) {
            el.html('Data unavailable for ' + el.html());
          } else {
            el.html(el.html()+' is '+Math.round((100/gon.relative_expenses[code]) * 10)/10 + '% as expensive as '+ gon.country)
          }
        };
      };

      var clearMap = function() {
        var mapObject = $('#' + gon.region).vectorMap('get', 'mapObject');
        var r = mapObject.series.regions[0];
        mapObject.series.regions[0].clear();
        return r;
      }

      var updateMap = function(r, min, max, values, view) {
        r.params.min = min;
        r.params.max = max;
        r.setValues(values);
        currentView = view;
      }

      $('#expenses-btn').on('click', function() {
        var r = clearMap();
        updateMap(r, "0.8", "05.6", gon.relative_expenses, "expenses")
        dataSet()
      });

      $('#peace-btn').on('click', function() {
        var r = clearMap();
        updateMap(r, "1.148", "3.645", gon.peace_index, "peace")
        dataSet()
      });

      $('#currency-btn').on('click', function() {
        var r = clearMap();
        updateMap(r, gon.percent_min, gon.percent_max, gon.percent_one_year, "currency")
        dataSet()
      });

      $('#currency-one-year').on('click', function() {
        var r = clearMap();
        updateMap(r, gon.percent_min, gon.percent_max, gon.percent_one_year, "currency")
        currentYear = gon.percent_one_year;
        dataSet()
      });

      $('#currency-two-years').on('click', function() {
        var r = clearMap();
        updateMap(r, gon.percent_min, gon.percent_max, gon.percent_two_years, "currency")
        currentYear = gon.percent_two_years;
        dataSet()
      });

      $('#currency-three-years').on('click', function() {
        var r = clearMap()
        updateMap(r, gon.percent_min, gon.percent_max, gon.percent_three_years, "currency")
        currentYear = gon.percent_three_years;
        dataSet()
      });
    })
});
