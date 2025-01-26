import PropTypes from "prop-types";
import PointerIcon from "../assets/pointer.svg";
import ReactMapGl, { Marker, Source, Layer } from "react-map-gl";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const TOKEN = "pk.eyJ1IjoibWFkaHVyaTExMSIsImEiOiJjbTJ5ZjJzNWUwMDZvMm5zY3h2cHRzczVoIn0.zeXl_ZP8HxJL0gAdFrbtLg";

type MapProps = {
  longitude: number;
  latitude: number;
  updateCoordinates: (latitude: number, longitude: number) => void;
};

const Map: React.FC<MapProps> = ({ longitude, latitude, updateCoordinates }) => {
  const [pop, setPop] = useState(false);

  const popOpen = () => {
    setPop(true);
  };

  const closePop = () => {
    setPop(false);
  };

  const [ownMarker, setOwnMarker] = useState({
    latitude: 13.0841939,
    longitude: 80.270186,
  });

  const layerStyle = {
    id: "polygon-layer",
    type: "fill" as const,
    paint: {
      "fill-color": "#fb2c36", // Fill color
      "fill-opacity": 0.6, // Transparency
    },
  };

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
            ],
          ],
        },
        properties: {},
      },
    ],
  };

  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    // Update viewport and marker when props change
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));

    setMarker({
      latitude,
      longitude,
    });
  }, [latitude, longitude]);

  const handleMarkerDrag = (event: any) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });
    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="z-10 w-[70vw] h-[100vh]">
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        {/* Draggable Marker */}
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src={PointerIcon} alt="Pointer" />
        </Marker>

        {/* Static Marker with Pop-up */}
        <Source id="polygon-source" type="geojson" data={geojson}>
          <Marker latitude={ownMarker.latitude} longitude={ownMarker.longitude}>
            <div style={{ fontSize: "24px", color: "red" }}>
              <div onClick={popOpen}>
                <FaLocationDot className="text-green-600" />
              </div>
              {pop && (
                <div className="bg-[#fffffffc] rounded-2xl justify-center font-extralight text-left px-[2vw] flex flex-col gap-[10px] py-[2vh]">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-[black]">Owner</h1>
                    <IoMdClose onClick={closePop} className="align-end cursor-pointer" />
                  </div>
                  <p className="text-[grey]">Sundharmurti</p>
                  <h2 className="text-[black]">Land Number</h2>
                  <p className="text-[grey]">324u23466vc3</p>
                  <p>ROW Applicable</p>
                  <button className="px-[10px] text-sm text-white py-[5px] rounded-2xl bg-[red]">
                    View more
                  </button>
                </div>
              )}
            </div>
          </Marker>
          {/* Polygon Layer */}
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGl>
    </div>
  );
};

Map.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
};

export default Map;
