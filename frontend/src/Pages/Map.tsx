
import React from 'react'
// import Map from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import { useState} from "react";
import { Marker } from "react-map-gl";
// import Room from "@mui/icons-material/Room";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import  { Source, Layer } from "react-map-gl";
import Bg from '../assets/black.png'
import { FaLocationDot } from "react-icons/fa6";
import { TbLocationSearch } from "react-icons/tb";
import { motion } from "motion/react"
import { IoMdClose } from "react-icons/io";

const Maps = () => {
    const [pop,setPop]=useState(false)
const popOpen=()=>{
    setPop(true)
}
    const [view,setView]=useState(false)
    // const [currentPlaceId, setCurrentPlaceId] = useState();
    const [viewport, setViewport] = useState({
        latitude: 13.0836939,
        longitude: 80.270186,
        zoom: 15,
      });

      const [inputs, setInputs] = useState({
        latitude: "",
        longitude: "",
      });


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const turnOn=()=>{
        setView(false)
      }
      const handleSetCoordinates = () => {
        const { latitude, longitude } = inputs;
     
    
        if (!latitude || !longitude) {
          alert("Please provide both latitude and longitude.");
          return;
        }
        if (latitude && longitude) {
            setView(true)
        }
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
    
        if (isNaN(lat) || isNaN(lng)) {
          alert("Please provide valid numeric values for latitude and longitude.");
          return;
        }
    
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      };

      const [marker, setMarker] = useState({
        latitude: 13.0841939,
        longitude: 80.270186,
      });
    
const closePop=()=>{
    setPop(false)
}

      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                    [80.270186, 13.0841939], // Top (north)
                    [80.270636, 13.0839439], // Top-right (northeast)
                    [80.270436, 13.0831939], // Bottom-right (southeast)
                  
                    [80.269736, 13.0839439], // Top-left (northwest)
                  ]
                  
              ],
            },
            properties: {
                // message: "This is a sample text message for the polygon.",
              },
          },
        ],
      };
   

      const layerStyle = {
        id: "polygon-layer",
        type: "fill",
        // text:"",
        paint: {
          "fill-color": "#fb2c36", // Fill color
          "fill-opacity": 0.6, // Transparency
        },
      };
  return (



    <motion.div style={{ width: "100vw", height: "100vh" }} className="App">
        <motion.div className='absolute z-10 w-[30vw] flex flex-col pt-[5vh] items-center h-[100vh] bg-[#00000000]'>
            {/* <button className='px-[2vw] py-[1vh] rounded-xl bg-[#bd1313] '>Go to Home</button> */}
 {view ? <>            <motion.div  
      initial={{ x: '20vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 50 }} onClick={turnOn} className='absolute bg-[red] flex justify-center  text-white items-center top-150 rounded-full  ml-[160vw] w-[100px] h-[100px] font-lighter text-6xl'><TbLocationSearch/></motion.div>
    </> : <> <motion.div  
      initial={{ x: '-20vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 50 }} className="flex flex-col  z-10 relative justify-center items-center h-[100vh] gap-[1vh]">
                <p className='text-[#fff] text-3xl'>SEARCH FOR PLACE..!</p>
                <input name="name"
          placeholder="Enter the Place you want to buy.."
          className=" w-[26vw] h-[50px]  rounded-2xl bg-[#292127] text-[#c7bdbda8] p-2 border border-[#ffffff2f] "
         />
         <motion.div className='flex flex-row gap-[10px]'>
        <input
          name="latitude"
          placeholder="Latitude of the place"
          className=" w-[] h-[50px]  rounded-2xl bg-[#292127] text-[#c7bdbda8] p-2 border border-[#ffffff2f] "
          value={inputs.latitude}
          onChange={handleInputChange}
        />
        <input
          name="longitude"
          placeholder="Longitude of the place"
          className=" w-[] h-[50px]  rounded-2xl bg-[#292127] text-[#c7bdbda8] p-2 border border-[#ffffff2f] "
          value={inputs.longitude}
          onChange={handleInputChange}
        />
        </motion.div>
        <button
          onClick={handleSetCoordinates}
          className="bg-red-500 w-[10vw] rounded-xl text-white p-2  mt-2"
        >
          Search
        </button>

            </motion.div>
            < motion.img initial={{ x: '-20vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 50 }} src={Bg}  className='absolute mt-[15vh]'/></>}
           
        </motion.div>
    <ReactMapGL
      {...viewport}
      mapboxAccessToken="pk.eyJ1IjoibWFkaHVyaTExMSIsImEiOiJjbTJ5ZjJzNWUwMDZvMm5zY3h2cHRzczVoIn0.zeXl_ZP8HxJL0gAdFrbtLg"
      onMove={(event) => setViewport(event.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100%", height: "100%" }} // Ensure map fills the motion.div
    //   transitionDuration="200"
    //   onDblClick={currentUser && handleAddClick}
    >

<Marker latitude={marker.latitude} longitude={marker.longitude}>
        <motion.div style={{ fontSize: "24px", color: "red" }}>
            <div className='' onClick={popOpen}><FaLocationDot className='text-green-600'/></div>
    {pop? <><div className='bg-[#aaa7a7fc] rounded-2xl justify-center  font-extralight text-left px-[2vw] flex flex-col gap-[10px] py-[2vh]'>
        
     <div className='flex flex-row justify-between'><h1 className='text-[black]'>Owner</h1> <IoMdClose onClick={closePop} className='align-end'/> </div>
     <p className='text-[grey]'>Sundharmurti</p>
     <h2 className='text-[black]'>Land Number</h2>
     <p className='text-[grey] '>324u23466vc3</p>
     <p>ROW Applicable</p>
     <button className='px-[10px] text-sm text-white py-[5px] rounded-2xl bg-[red]'>View more</button>
        </div></>:<>
      </>

    }

        </motion.div>
      </Marker>

<Source id="polygon-source" type="geojson" data={geojson}>
      {/* <div className='relative z-10'>  <FaLocationDot/></div> */}
        <Layer {...layerStyle} />
      </Source>
</ReactMapGL>

</motion.div>
  )
}

export default Maps
