import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Bg from '../assets/bg.png'
import Star from '../assets/star.png'
import Lines from '../assets/lines.png'
import '../App.css'

// Define the type for the coordinate pairs
interface Coordinate {
  latitude: string;
  longitude: string;
}

const Gov = () => {
  // State to handle the number of corner points and the coordinates
  const [numCorners, setNumCorners] = useState<number>(0); // Number of corner points
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]); // Stores pairs of latitudes and longitudes

  // Update the number of corners and reset coordinates when it changes
  const handleNumCornersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumCorners = parseInt(event.target.value, 10);
    setNumCorners(newNumCorners);
    setCoordinates(Array(newNumCorners).fill({ latitude: "", longitude: "" }));
  };

  // Handle the change in either latitude or longitude input
  const handleCoordinateChange = (index: number, field: keyof Coordinate, value: string) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index][field] = value;
    setCoordinates(updatedCoordinates);
  };

  return (
    <motion.div className="bg-[#150c13] flex flex-col pt-[5vh] justify-center items-center relative overflow-hidden w-[100vw] h-[100vh]">
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Star} className="absolute top-30 ml-[80vw]" />
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Star} className="absolute rotate-90 w-[100px] top-50 ml-[-80vw]" />
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Star} className="absolute top-130 ml-[-60vw]" />
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Star} className="absolute top-130 z-10 rotate-85 w-[50px] ml-[70vw]" />
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Lines} className="absolute w-[105vw]" />

      <div className="flex flex-col w-[55vw] h-full pt-[20vh] justify-center items-center relative overflow-y-scroll scrollbar">
        <h1 className="text-5xl text-[#a60b0b] text-center">Upload your Land details</h1>
        <form>
          {/* Adhaar Number */}
          <div className="mt-[3vh]">
            <label className="text-lg font-medium text-[#ffffffbd]">Adhaar Number:</label>
            <input
              type="text"
              placeholder="Enter Your Adhaar Number Here..."
              className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
            />
          </div>

          {/* Phone Number */}
          <div className="mt-[3vh]">
            <label htmlFor="phone" className="block text-lg font-medium text-[#ffffffbd]">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Your Phone Number Here..."
              className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
              required
            />
          </div>

          {/* Upload Land Tax Receipt */}
          <div className="mt-[3vh]">
            <label htmlFor="upload" className="block text-lg font-medium text-[#ffffffbd]">Upload Land Tax Reciept:</label>
            <input
              type="file"
              id="upload"
              name="upload"
              className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md text-center border-gray-300 shadow-xl px-[8px] text-[#000000]"
              required
            />
          </div>

          {/* Number of Corner Points */}
          <div className="mt-[3vh]">
            <label htmlFor="numCorners" className="block text-lg font-medium text-[#ffffffbd]">Number of Corner Points:</label>
            <input
              type="number"
              id="numCorners"
              name="numCorners"
              placeholder="Enter the number of corners that your land have..."
              className="mt-1 block w-[50vw] bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
              value={numCorners}
              onChange={handleNumCornersChange}
              required
            />
          </div>

          <h1 className="text-center text-xl mt-[5vh] font-medium text-[#ffffffbd]">Corner Point Lat-Long Pairs</h1>

          {/* Dynamic Latitude and Longitude Inputs */}
          {Array.from({ length: numCorners }).map((_, index) => (
            <div key={index} className="mt-4 flex flex-row gap-[20px]">
              {/* Latitude Input */}
              <div className="mt-[3vh]">
                <label htmlFor={`latitude-${index}`} className="block text-lg font-medium text-[#ffffffbd]">
                  Latitude {index + 1}:
                </label>
                <input
                  type="text"
                  id={`latitude-${index}`}
                  name={`latitude-${index}`}
                  value={coordinates[index]?.latitude || ""}
                  placeholder="Enter Latitude"
                  onChange={(e) => handleCoordinateChange(index, "latitude", e.target.value)}
                  className="mt-1 block w-[24vw] bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              {/* Longitude Input */}
              <div className="mt-[3vh]">
                <label htmlFor={`longitude-${index}`} className="block text-lg font-medium text-[#ffffffbd]">
                  Longitude {index + 1}:
                </label>
                <input
                  type="text"
                  id={`longitude-${index}`}
                  name={`longitude-${index}`}
                  value={coordinates[index]?.longitude || ""}
                  placeholder="Enter Longitude"
                  onChange={(e) => handleCoordinateChange(index, "longitude", e.target.value)}
                  className="mt-1 block w-[24vw] bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button className="px-[2vw] w-[10vw] py-[2vh] mt-[3vh] text-xl rounded-2xl text-[#ffffff9c] bg-[#990a0a]">Submit</button>
        </form>
      </div>
    </motion.div>
  );
}

export default Gov;
