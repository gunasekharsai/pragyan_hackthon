import React, { ChangeEvent } from "react";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import { useNavigate } from "react-router-dom";

type Address = {
  streetAndNumber: string;
  place: string;
  region: string;
  postcode: string;
  country: string;
  latitude?: string;
  longitude?: string;
};

type AddressFormProps = {
  address: Address;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

const AddressForm: React.FC<AddressFormProps> = ({ address, onSubmit, setAddress }) => {
  const navigate = useNavigate();

  const handleManualInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    stateProperty: keyof Address
  ) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;
    setAddress(newAddress);
  };

  const homeClick = () => {
    navigate("/");
  };

  return (
    <form
      className="form bg-[black] px-[4vw] gap-[2vh] justify-center items-left flex flex-col w-[30vw]"
      onSubmit={onSubmit}
    >
      <p className="text-[#a51111] text-center text-3xl">Search for Place..!</p>

      <label htmlFor="address" className="text-[#FFF]">
        Address
      </label>
      <AutoCompleteInput
        setAddress={setAddress}
        handleManualInputChange={handleManualInputChange}
        streetAndNumber={address.streetAndNumber}
      />

      <label htmlFor="city" className="text-[#908787]">
        City
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="city"
        placeholder="Enter city name"
        value={address.place}
        onChange={(event) => handleManualInputChange(event, "place")}
      />

      <label htmlFor="state" className="text-[#908787]">
        State/Province/Region
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="state"
        placeholder="State/Province/Region"
        value={address.region}
        onChange={(event) => handleManualInputChange(event, "region")}
      />

      {/* <label htmlFor="postcode" className="text-[#908787]">
        Postcode
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="postcode"
        placeholder="Postcode"
        value={address.postcode}
        onChange={(event) => handleManualInputChange(event, "postcode")}
      /> */}

      {/* <label htmlFor="country" className="text-[#908787]">
        Country
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="country"
        placeholder="Country"
        value={address.country}
        onChange={(event) => handleManualInputChange(event, "country")}
      /> */}

      <label htmlFor="latitude" className="text-[#908787]">
        Latitude
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="latitude"
        placeholder="Latitude"
        value={address.latitude || ""}
        onChange={(event) => handleManualInputChange(event, "latitude")}
      />

      <label htmlFor="longitude" className="text-[#908787]">
        Longitude
      </label>
      <input
        className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#fff]"
        type="text"
        id="longitude"
        placeholder="Longitude"
        value={address.longitude || ""}
        onChange={(event) => handleManualInputChange(event, "longitude")}
      />

      <div className="buttons justify-center items-center flex flex-row gap-[2vh]">
        <button
          type="reset"
          className="px-[1vw] h-[50px] rounded-xl text-white bg-[#ffbf00cd]"
          onClick={homeClick}
        >
          Back to Home
        </button>

        <button
          type="submit"
          className="w-[100px] h-[50px] rounded-xl text-white bg-[#ff0000cd]"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
