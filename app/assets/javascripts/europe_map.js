$(document).ready(function(){
  if (gon.region === "europe"){
  var currentView = "currency"
  $(function(){
    $('#europe').vectorMap({
    map: 'europe_mill',
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
                values: gon.percent_two_years,
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
      dataSet(e, el, code);
    }
    });
    var mapObject = $('#world').vectorMap('get', 'mapObject');


    var dataSet = function(e, el, code) {
      if (currentView === "currency") {
        if (gon.percent_two_years[code] > 0) {
          el.html(el.html()+'\'s currency has become '+gon.percent_two_years[code]+'% cheaper');
        } else if (gon.percent_two_years[code] < 0) {
          el.html(el.html()+'\'s currency has become '+gon.percent_two_years[code]*(-1)+'% more expensive');
        } else if (gon.percent_two_years[code] === 0) {
          el.html(el.html()+'\ uses the same currency');
        } else {
          el.html(el.html() + ' N/A');
        }
      } else{
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
    }

    $('#expenses-btn').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      $('#currency-one-year').hide();
      $('#currency-two-years').hide();
      $('#currency-three-years').hide();
      $('#currency-btn').fadeTo('fast', 1);
      r.params.min = gon.expenses_min;
      r.params.max = gon.expenses_max;
      r.setValues(gon.relative_expenses);
      currentView = "expenses";
      dataSet()
    });

    $('#currency-btn').on('click', function() {
      $(this).fadeTo('fast', 0);
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      $('#currency-one-year').fadeTo('fast', 1);
      $('#currency-two-years').fadeTo('fast', 1);
      $('#currency-three-years').fadeTo('fast', 1);
      r.params.min = gon.percent_min;
      r.params.max = gon.percent_max;
      r.setValues(gon.percent_two_years);
      currentView = "currency";
      dataSet()
    });

    $('#currency-one-year').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = gon.percent_min;
      r.params.max = gon.percent_max;
      r.setValues(gon.percent_one_year);
      dataSet()
    });

    $('#currency-two-years').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = gon.percent_min;
      r.params.max = gon.percent_max;
      r.setValues(gon.percent_two_years);
      dataSet()
    });

    $('#currency-three-years').on('click', function() {
      var mapObject = $('#world').vectorMap('get', 'mapObject');
      var r=mapObject.series.regions[0];
      mapObject.series.regions[0].clear();
      r.params.min = gon.percent_min;
      r.params.max = gon.percent_max;
      r.setValues(gon.percent_three_years);
      dataSet()
    });
  })
}
});
