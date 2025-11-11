import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import './IncidentHotspotMap.css';

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
      const latLngs = points.map(p => [p.latitude, p.longitude]);
      heatLayerRef.current = L.heatLayer(latLngs, {
        radius: 25,
        blur: 15,
        maxZoom: 18,
      }).addTo(map);
    }

  }, [map, points]);

  return null;
};

const IncidentHotspotMap = ({ hotspots }) => {
  const defaultPosition = [14.335006311539903, 78.54059633664295]; // Fallback center

  return (
    <div className="map-container">
      <h3>Incident Hotspots (Last 30 Days)</h3>
      <MapContainer center={defaultPosition} zoom={10} style={{ height: '100%', width: '100%' }}>
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