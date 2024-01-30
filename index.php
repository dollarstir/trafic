<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accra Route Finder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/>
</head>
<body>
    <div class="wrapper">
    <h1>Accra Route Finder</h1>
    
    <div class="input-container">
        <div class="input-with-icon">
            <input id="start" type="text" placeholder="Enter starting point">
            <span id="current-location-icon">📍</span>
        </div>
        <div class="box">
            <input id="end" type="text" placeholder="Enter destination">
            <button id="submit">Find Route</button>
        </div>
    </div>

    <div id="map"></div>
    </div>
    <script src="script.js"></script>
 
        <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAy9xR_ioh6A7CZdMDsSaVm0xkaBhTaMU8&libraries=places&callback=initMap">
        // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAy9xR_ioh6A7CZdMDsSaVm0xkaBhTaMU8&callback=initMap">
    </script>
</body>
</html>
