import { useMemo } from "react";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";

export default function Home () {
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyBt5hB1RXZT8C0KTVsAYYBoE1XWB_w8nWU"})

    if (!isLoaded) return <div>LOADING...</div>

    return <Map />
}

function Map () {
    var lat, long;
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            console.log("Latitud: " + position.coords.latitude);
            console.log("Longitud: " + position.coords.longitude);
            lat = position.coords.latitude;
            long = position.coords.longitude;

           
        })
    }
    const center = {lat:  25.7359872, lng: -100.3159552};
    return <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">


        <Marker position={center}/>
    </GoogleMap>
}