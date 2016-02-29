$(document).ready(function(){

  $(function(){
    $('#south-america-map').vectorMap({
    map: 'south_america_mill',
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
    onRegionTipShow: function(e, el, code){
      el.html(el.html()+' (Change: '+gon.percent[code]*100+'%)');
    }
    });
  })
});
