import React, { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import AddressForm from "../Components/AddressForm";
import Map from "../Components/Map";

const Maps: React.FC = () => {
  const [start, setStart] = useState(false);
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStart(true);

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const updateCoordinates = (latitude: number, longitude: number) => {
    setAddress({ ...address, latitude: latitude.toString(), longitude: longitude.toString() });
  };




  return (
    <div className="w-screen h-[100vh] flex flex-row">
      <AddressForm onSubmit={handleFormSubmit} address={address} setAddress={setAddress} />
      {start ? (
        <>
          {address.longitude && address.latitude && (
            <Map
              longitude={parseFloat(address.longitude)}
              latitude={parseFloat(address.latitude)}
              updateCoordinates={updateCoordinates}
            />
          )}
        </>
      ) : (
        <div className="text-2xl w-[70vw] flex justify-center items-center align-middle text-center">
          Please select any location..!!
        </div>
      )}
    </div>
  );
};

export default Maps;
