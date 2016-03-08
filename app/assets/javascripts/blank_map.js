$(document).ready(function(){
  $(function(){
    $('#blank-map').vectorMap({
    map: 'world_mill',
    zoomButtons : false,
    backgroundColor: ['white'],
    regionStyle: {
                  initial: {
                            fill: 'black',
                            "fill-opacity": 1,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 1
                           }
                  },
    });
  })
});
