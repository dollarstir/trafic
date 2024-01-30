
let map;
let directionsService;
let directionsRenderer;
let startAutocomplete;
let endAutocomplete;
let userLocation = null;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 5.6037, lng: -0.1870 }, // Coordinates for Accra, Ghana
        zoom: 12
    });

    directionsRenderer.setMap(map);

    // Initialize autocomplete for both input fields
    // startAutocomplete = new google.maps.places.Autocomplete(
    //     document.getElementById('start'),
    //     { types: ['geocode'] }
    // );
    // endAutocomplete = new google.maps.places.Autocomplete(
    //     document.getElementById('end'),
    //     { types: ['geocode'] }
    // );

    setupAutocomplete();
    getCurrentLocation();

    document.getElementById("submit").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}

// function calculateAndDisplayRoute(directionsService) {
//     const start = document.getElementById("start").value;
//     const end = document.getElementById("end").value;

//     directionsService.route({
//             origin: start,
//             destination: end,
//             travelMode: google.maps.TravelMode.DRIVING,
//             provideRouteAlternatives: true,
//             drivingOptions: {
//                 departureTime: new Date(), // Current time
//                 trafficModel: 'bestguess'
//             }
//         },
//         (response, status) => {
//             if (status === "OK") {
//                 response.routes.forEach((route, index) => {
//                     const directionsRenderer = new google.maps.DirectionsRenderer({
//                         map: map,
//                         directions: response,
//                         routeIndex: index,
//                         polylineOptions: {
//                             strokeColor: index === 0 ? 'red' : 'green',
//                             strokeOpacity: 0.7,
//                             strokeWeight: 6
//                         }
//                     });

//                     // Display the estimated time for each route
//                     displayRouteDuration(route, index);
//                 });
//             } else {
//                 window.alert("Directions request failed due to " + status);
//             }
//         }
//     );
// }

let currentRenderers = []; // Array to hold current DirectionsRenderer instances

function calculateAndDisplayRoute(directionsService) {
    // Clear out any existing renderers
    currentRenderers.forEach(renderer => renderer.setMap(null));
    currentRenderers = []; // Reset the array

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            drivingOptions: {
                departureTime: new Date(), // Current time
                trafficModel: 'bestguess'
            }
        },
        (response, status) => {
            if (status === "OK") {
                response.routes.forEach((route, index) => {
                    const directionsRenderer = new google.maps.DirectionsRenderer({
                        map: map,
                        directions: response,
                        routeIndex: index,
                        polylineOptions: {
                            strokeColor: index === 0 ? 'red' : 'green',
                            strokeOpacity: 0.7,
                            strokeWeight: 6
                        }
                    });

                    // Store the renderer instance
                    currentRenderers.push(directionsRenderer);

                    // Display the estimated time for each route
                    displayRouteDuration(route, index);
                });
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}


function displayRouteDuration(route, index) {
    const routeDuration = route.legs.reduce((total, leg) => total + leg.duration.value, 0);
    const durationText = `Route ${index + 1}: ${Math.floor(routeDuration / 60)} min`;
    
    const infoWindow = new google.maps.InfoWindow({
        content: durationText,
        position: route.legs[0].start_location
    });
    infoWindow.open(map);

    // Optionally, close the info window after a set time
    setTimeout(() => infoWindow.close(), 10000); // Closes after 10 seconds
}


function setupAutocomplete() {
    startAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('start'),
        { types: ['geocode'] }
    );
    endAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('end'),
        { types: ['geocode'] }
    );

    if (userLocation) {
        startAutocomplete.setBounds(new google.maps.LatLngBounds(userLocation));
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("Location access granted.");
            console.log("Coordinates:", position.coords.latitude, position.coords.longitude);
            userLocation = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );
            console.log("User location is:", userLocation.toString());
            map.setCenter(userLocation);
            setupAutocomplete(); // Re-setup autocomplete with user location
        }, () => {
            console.error("Error fetching location. User denied the request or other error occurred.");
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


document.getElementById("current-location-icon").addEventListener("click", () => {
    if (userLocation) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': userLocation }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    document.getElementById("start").value = results[0].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    } else {
        window.alert("Current location not available");
    }
})

