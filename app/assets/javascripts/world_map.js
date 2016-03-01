$(document).ready(function(){

  $(function(){
    $('#world-map').vectorMap({
    map: 'world_mill',
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                    fill: 'grey',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 0.5,
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
                min: -0.15,
                max: 0.5,
                normalizeFunction: 'linear'
              }]
            },
    // Sets the pop-up descriptions when hovering over a country
    onRegionTipShow: function(e, el, code){
      if (gon.percent[code]*100 > 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]*100+'% more cheap');
      } else if (gon.percent[code]*100 < 0) {
        el.html(el.html()+'\'s currency has become '+gon.percent[code]*(-100)+'% more expensive');
      } else if (gon.percent[code]*100 === 0) {
        el.html(el.html()+'\ uses the same currency');
      } else {
        el.html('No data avialable for' + el.html());
      }
    }
    });
    var mapObject = $('#world-map').vectorMap('get', 'mapObject');

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

    $('#update').on('click', function() {
      mapObject.series.regions[0].setValues(gon.wipe);
      // clearMap();
    });
  })

});
