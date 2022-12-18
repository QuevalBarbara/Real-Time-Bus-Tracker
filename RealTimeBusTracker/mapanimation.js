const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];


mapboxgl.accessToken =
  'pk.eyJ1IjoiYmFyYmFyYXFtIiwiYSI6ImNsYmR3YWpsZzA1Y3kzd3A5Z3NrNXp4bzMifQ.mjqr6edS1UfrcJZmxLcAYA';


  const map = new mapboxgl.Map({
    container: "map", 
    style: "mapbox://styles/mapbox/streets-v11", 
    center: [-71.104881, 42.365554], 
    zoom: 12, 
    });
    map.resize();
    
    var busesMarkers = [];
    async function run(){  
      const locations = await getBusLocations();
      console.log(locations)
      locations.forEach((bus, i) => {
        var marker = new mapboxgl.Marker({ "color": colors[i] })
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .setPopup(new mapboxgl.Popup({offset: 25, closeOnClick: false, closeButton: false}).setHTML(`<h3>Bus ID <br>
        ${bus.attributes.label}</h3>`))
        .addTo(map)
        .togglePopup();
    
        busesMarkers.push(marker);	
      });
    
      function eraseMarks(){
        if (busesMarkers!==null) {
        for (var i = busesMarkers.length - 1; i >= 0; i--) {
        busesMarkers[i].remove();
        }
      }
      }
    
      locations.forEach((marker, i)=>{
        let popUp = document.getElementsByClassName('mapboxgl-popup-content');
        popUp[i].style.background = colors[i];
      });
    
      setTimeout(eraseMarks,7500)
    
      setTimeout(run, 15000);
    }
    
    
    async function getBusLocations(){
      const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
      const response = await fetch(url);
      const json     = await response.json();
      return json.data;
    }
    
    map.on('load', function () {
      run();
      });