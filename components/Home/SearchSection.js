"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import CarListOptions from "./CarListOptions";

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState([]);
  // const calculateDistance = () => {
  //   const dist = google.maps.geometry.spherical.computeDistanceBetween(
  //     { lat: source.lat, lng: source.lng },
  //     { lat: destination.lat, lng: destination.lng }
  //   );
  //   console.log("Distance in miles:", dist * 0.000621371);
  //   console.log("Distance in kilometers:", dist / 1000);
  //   setDestination(dist * 0.000621371);
  // };
  const calculateDistance = () => {
    // Create proper LatLng objects
    const sourceLatLng = new google.maps.LatLng(source.lat, source.lng);
    const destLatLng = new google.maps.LatLng(destination.lat, destination.lng);

    // Calculate distance in meters
    const distMeters = google.maps.geometry.spherical.computeDistanceBetween(
      sourceLatLng,
      destLatLng
    );

    // Convert units
    const distMiles = distMeters * 0.000621371;
    const distKm = distMeters / 1000;

    console.log("Distance in miles:", distMiles);
    console.log("Distance in kilometers:", distKm);

    // Update state (assuming this stores the distance)
    setDistance(distMiles); // Rename setter appropriately
  };

  useEffect(() => {
    if (source) {
      console.log(source);
    }
    if (destination) {
      console.log(destination);
    }
  }, [source, destination]);
  return (
    <div>
      <div className="p-2 md:pd-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className=" p-3  bg-black w-full mt-5 text-white rounded-lg"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
