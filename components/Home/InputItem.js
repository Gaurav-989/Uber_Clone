"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

// Import your context (make sure you have these created correctly)
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState("");

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (type === "source") {
      setPlaceholder("Pickup Location");
    } else {
      setPlaceholder("Drop Off Location");
    }
  }, [type]);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        const locationData = {
          lat,
          lng,
          name: place.formatted_address,
          label: place.name,
        };

        if (type === "source") {
          setSource(locationData);
        } else {
          setDestination(locationData);
        }

        console.log("Location:", lat, lng);
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === "source" ? "/source.png" : "/destination.png"}
        width={15}
        height={15}
        alt="location icon"
      />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            setValue(place);
            getLatAndLng(place, type);
          },
          placeholder,
          isClearable: true,
          className: "w-full",
          components: { DropdownIndicator: false },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
