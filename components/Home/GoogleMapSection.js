import React, { useState, useContext, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayViewF,
  OverlayView,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
function GoogleMapSection() {
  const containerStyle = {
    width: "100%",
    height: window.innerWidth * 0.45,
  };

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState();
  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (source.length != [] && destination.length != []) {
      DirectionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if (source.length != [] && destination.length != []) {
      DirectionRoute();
    }
  }, [destination]);

  const DirectionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  // (result, status) => {
  //   if (status === window.google.maps.DirectionsStatus.OK) {
  //     console.log(result);
  //     // Handle the result here (e.g., display directions on the map)
  //   } else {
  //     console.error(`Error fetching directions ${result}`);
  //   }
  // };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => setMap(map)}
      // onUnmount={onUnmount}
      options={{ mapId: "e25096b1e6d87ed6" }}
    >
      {source.length != [] ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="bg-white p-2 font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}
      {destination.length != [] ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="bg-white p-2 font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: "#000",
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
