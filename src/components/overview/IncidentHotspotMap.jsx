import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    
    // Remove old layer if it exists
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }
    
    if (points && points.length > 0) {
      // Ensure leaflet-heat is available
      if (!L.heatLayer) {
        console.error('Leaflet.heat is not loaded');
        return;
      }
      
      // Map points to [lat, lng, intensity] format
      const heatPoints = points.map(p => [p.latitude, p.longitude, p.intensity || 1]);
      
      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 35,
        blur: 25,
        maxZoom: 17,
        max: 0.6,
        minOpacity: 0.6,
        gradient: {
          0.2: 'blue',
          0.4: 'cyan',
          0.6: 'lime',
          0.8: 'yellow',
          1.0: 'red'
        }
      }).addTo(map);
    }

    return () => {
      if (heatLayerRef.current && map) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points]);

  return null;
};

// Sample data for demonstration
const sampleHotspots = [
  { latitude: 14.335006, longitude: 78.540596, intensity: 0.8 },
  { latitude: 14.340006, longitude: 78.545596, intensity: 0.9 },
  { latitude: 14.345006, longitude: 78.550596, intensity: 0.7 },
  { latitude: 14.330006, longitude: 78.535596, intensity: 1.0 },
  { latitude: 14.338006, longitude: 78.542596, intensity: 0.6 },
  { latitude: 14.342006, longitude: 78.548596, intensity: 0.85 },
  { latitude: 14.336006, longitude: 78.541596, intensity: 0.75 },
  { latitude: 14.344006, longitude: 78.547596, intensity: 0.95 },
  { latitude: 14.332006, longitude: 78.537596, intensity: 0.65 },
  { latitude: 14.348006, longitude: 78.552596, intensity: 0.8 },
];

const IncidentHotspotMap = ({ hotspots = sampleHotspots }) => {
  const defaultPosition = [14.335006311539903, 78.54059633664295];

  // Load leaflet-heat dynamically
  useEffect(() => {
    if (!L.heatLayer) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js';
      script.async = true;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="map-container" style={{ height: '600px', padding: '20px' }}>
      <h3>Incident Hotspots (Last 30 Days)</h3>
      <MapContainer 
        center={defaultPosition} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer points={hotspots} />
      </MapContainer>
    </div>
  );
};

export default IncidentHotspotMap;