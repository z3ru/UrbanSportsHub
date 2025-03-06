import { useContext, useEffect, useRef } from 'react';
import CheckInContext from '../../context/CheckInContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = () => {
  const { checkInTime } = useContext(CheckInContext);
  const mapRef = useRef(null); // Ref for the map container
  const leafletMap = useRef(null); // Ref for Leaflet map instance

  useEffect(() => {
    if (!checkInTime || !mapRef.current) return;

    // Prevent reinitializing if the map already exists
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      ).addTo(leafletMap.current);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            leafletMap.current.setView(
              [pos.coords.latitude, pos.coords.longitude],
              14
            ),
          (err) => console.warn(`Geolocation error: ${err.message}`)
        );
      }
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [checkInTime]);

  return <div className="map" ref={mapRef} />;
};

export default Map;
