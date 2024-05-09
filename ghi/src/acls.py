import requests, json
from .keys import OPEN_WEATHER_API_KEY

def get_coordinates(city, state):
    coordinates = []
    geo_url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q": f'{city},{state},US,'
        "appid": "49dfe50756c388896eda49173c9009be",
        "limit": 1,
    }
    response = requests.get(geo_url, params=params)
    content = response.json()
    coordinates.append(lat = content[0]["lat"])
    coordinates.append(lon = content[0]["lon"])
    return coordinates



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>maps</title>
    <style>
        map {
            width: 60%;
            height: 400px;
        }
    </style>
</head>
<body>
    <h3>My Google Maps Demo</h3>
    <div id="map">
    </div>
    <script>
        async function initMap(){
            let uluru = {lat: -25.344, lng: 131.036};
            let map = new google.maps.Map(
                document.getElementById('map'), {zoom: 8, center: uluru}
            );
            let marker = new google.maps.Marker({position: uluru, map: map})
        }
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDr-zfadBeXhKoHOGZ25lP400bCtaS5L0&loading=async&callback=initMap">

    </script>
</body>
</html>
