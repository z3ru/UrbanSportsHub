import { useContext, useEffect } from 'react';
import CheckInContext from '../../context/CheckInContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = () => {
  const { checkInTime } = useContext(CheckInContext);

  useEffect(() => {
    if (!checkInTime) return;

    const map = L.map('map', {
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
    ).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => map.setView([pos.coords.latitude, pos.coords.longitude], 14),
        (err) => console.warn(`Geolocation error: ${err.message}`)
      );
    }

    return () => map.remove();
  }, [checkInTime]);
  return <div id="map" />;
};

export default Map;
