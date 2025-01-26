import React, { useState } from "react";
import PropTypes from "prop-types";
import getPlaces from "./getplace";

type Address = {
  streetAndNumber: string;
  place: string;
  region: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
};

type Suggestion = {
  place_name: string;
  center: [number, number];
  context: {
    id: string;
    text: string;
  }[];
};

type AutoCompleteInputProps = {
  handleManualInputChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  setAddress: (address: Address) => void;
  streetAndNumber: string;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query: string) => {
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const streetAndNumber = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address: Address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];
      if (identifier in address) {
        // @ts-ignore: Dynamic assignment of context values to address fields
        address[identifier] = element.text;
      }
    });

    console.log(address.longitude, address.latitude);

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="autoCompleteInputContainer">
        <input
          className="text-xl border-1 rounded-xl px-[1vw] py-[1vh] border-[#8c838377] text-[#908787]"
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
        />
        <ul className="addressSuggestions text-white text-xl px-[1vw] absolute w-[] py-[1vh] bg-[#000000]">
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer hover:bg-gray-700 px-2 py-1"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

AutoCompleteInput.propTypes = {
  handleManualInputChange: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  streetAndNumber: PropTypes.string.isRequired,
};

export default AutoCompleteInput;
