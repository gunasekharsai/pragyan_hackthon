import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
        InfoWindow: typeof google.maps.InfoWindow;
        LatLngBounds: typeof google.maps.LatLngBounds;
        places: {
          SearchBox: typeof google.maps.places.SearchBox;
        };
        marker: {
          AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
          PinElement: typeof google.maps.marker.PinElement;
        };
      };
    };
    initMap: () => void;
  }
}

interface NFT {
  id: number;
  name: string;
  lat: number;
  lng: number;
  image: string;
  marker?: google.maps.marker.AdvancedMarkerElement;
  infoWindow?: google.maps.InfoWindow;
}

const NFTMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [activeNft, setActiveNft] = useState<NFT | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockNfts: NFT[] = [
    { id: 1, name: "CryptoArt #1", lat: 19.0760, lng: 72.8777, image: "/api/placeholder/150/150" },
    { id: 2, name: "DigitalPunk #42", lat: 28.7041, lng: 77.1025, image: "/api/placeholder/150/150" },
    { id: 3, name: "BlockArt #7", lat: 12.9716, lng: 77.5946, image: "/api/placeholder/150/150" }
  ];

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2kivdmJg5qpbqov5sXo7IUAEonslEw-8&libraries=places,marker&loading=async&callback=initMap`;
      script.defer = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        mapId: '5665ccb80be1f69f',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(mapInstance);

      const input = document.getElementById('search-input') as HTMLInputElement;
      if (!input) return;
      
      const searchBox = new window.google.maps.places.SearchBox(input);

      mapInstance.addListener('bounds_changed', () => {
        const bounds = mapInstance.getBounds();
        if (bounds) {
          searchBox.setBounds(bounds);
        }
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry) return;
          
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else if (place.geometry.location) {
            bounds.extend(place.geometry.location);
          }
        });
        mapInstance.fitBounds(bounds);
      });
    };

    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      loadGoogleMaps();
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    nfts.forEach(nft => {
      if (nft.marker) {
        nft.marker.map = null;
      }
    });

    const newNfts = mockNfts.map(nft => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: { lat: nft.lat, lng: nft.lng },
        map,
        content: new window.google.maps.marker.PinElement({
          scale: 1.2,
          background: '#8B5CF6',
          borderColor: '#ffffff'
        }).element
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <img src="${nft.image}" alt="${nft.name}" class="w-32 h-32 object-cover rounded mb-2"/>
            <h3 class="font-bold">${nft.name}</h3>
            <p class="text-sm text-gray-500">Lat: ${nft.lat}, Lng: ${nft.lng}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        if (activeNft?.infoWindow) {
          activeNft.infoWindow.close();
        }
        infoWindow.open(map, marker);
        setActiveNft({ ...nft, infoWindow, marker });
      });

      return { ...nft, marker, infoWindow };
    });

    setNfts(newNfts);
  }, [map, activeNft]);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 w-64">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full px-4 py-2 rounded-lg shadow-lg pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div ref={mapRef} className="w-full h-full" />

      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
        <h3 className="font-bold mb-2">NFTs in View</h3>
        <div className="space-y-2">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                if (!map) return;
                map.panTo({ lat: nft.lat, lng: nft.lng });
                map.setZoom(12);
                if (nft.infoWindow && nft.marker) {
                  nft.infoWindow.open(map, nft.marker);
                }
                setActiveNft(nft);
              }}
            >
              <img src={nft.image} alt={nft.name} className="w-8 h-8 rounded" />
              <div>
                <p className="font-medium">{nft.name}</p>
                <p className="text-xs text-gray-500">
                  {nft.lat.toFixed(4)}, {nft.lng.toFixed(4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTMap;