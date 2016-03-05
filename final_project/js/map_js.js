/*Javascript incorporating google api via google guides*/
var map;
var infowindow;

//intializes the map around SCU
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3496418, lng: -121.9389875},
    zoom: 14
  });

  //generates inital info windows above locations
  infowindow = new google.maps.InfoWindow();


  //finds current location
  if (navigator.geolocation) {
    //sets your current positioning
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //creates a marker where you are with an animated drop marker
      var marker = new google.maps.Marker({
        position:pos,
        animation: google.maps.Animation.DROP,
      });

      //specific infowindow for where you are
      var infowindow = new google.maps.InfoWindow({
        content:"You are located here"
       });

      //places markers and infowindow on map
      marker.setMap(map);
      infowindow.open(map,marker);

      //makes center of page your location found 
      map.setCenter(pos); 


      var service = new google.maps.places.PlacesService(map);

      //queries google for recycling facilities nearby
      service.textSearch({
        location: pos,
        radius: 100,
        query: ['recycling centre']
      }, callback);
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } 

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

//creates multiple markers for facilities to be found
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
