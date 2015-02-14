
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // General options
        zoom: 15,
        disableDefaultUI: true,
        
        // The latitude and longitude to center the map (always required)
        //center: new google.maps.LatLng(0.0, 0.0), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"all","elementType":"geometry","stylers":[{"gamma":"5"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#bdc3c7"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#bdc3c7"},{"gamma":"5"},{"lightness":"60"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#95a5a6"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#2ecc71"},{"gamma":"10.00"},{"lightness":"60"},{"saturation":"0"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ecf0f1"},{"gamma":"5"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#bdc3c7"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#bdc3c7"},{"gamma":"2"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#3498db"},{"gamma":"5"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    //Get the current position of the user
    if(!!navigator.geolocation){

    navigator.geolocation.getCurrentPosition(function(position) {
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(geolocate);  
        });

    } else {
        document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
    }

}
