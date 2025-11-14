import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import './IncidentsMap.css';

const IncidentsMap = ({ incidents }) => {
  const incidents1 = incidents.rows;
  const defaultPosition = [40.7128, -74.0060]; // Default to NYC, change as needed

  // Create custom marker icons based on severity
  const createCustomIcon = (severity) => {
    const colors = {
      LOW: '#3b82f6',    // Blue
      MEDIUM: '#f59e0b', // Orange
      HIGH: '#ef4444'    // Red
    };

    const color = colors[severity] || '#6b7280';

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        ">
          <div style="
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 16px;
          ">!</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  if (!incidents1 || incidents1.length === 0) {
    return (
      <div className="map-empty-state">
        <div className="map-empty-icon">🗺️</div>
        <div className="map-empty-text">No incident locations to display</div>
        <div className="map-empty-subtext">
          Incidents with location data will appear on the map once available
        </div>
      </div>
    );
  }

  // Find the center of the map based on the incidents
  const center = incidents1[0]?.location?.coordinates
    ? [incidents1[0].location.coordinates[1], incidents1[0].location.coordinates[0]]
    : defaultPosition;

  const getStatusClass = (status) => {
    return status.toLowerCase().replace('_', '-');
  };

  const getSeverityClass = (severity) => {
    return severity.toLowerCase();
  };

  return (
    <div className="incidents-map-container">
      <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {incidents1.map((incident) => {
          const position = [
            incident.location.coordinates[1],
            incident.location.coordinates[0],
          ];
          return (
            <Marker 
              key={incident.id} 
              position={position}
              icon={createCustomIcon(incident.severity)}
            >
              <Popup>
                <div className="map-popup-content">
                  <h3 className="map-popup-title">{incident.title}</h3>
                  <div className="map-popup-info">
                    <div className="map-popup-row">
                      <span className="map-popup-label">Severity:</span>
                      <span className={`map-severity-badge ${getSeverityClass(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </div>
                    <div className="map-popup-row">
                      <span className="map-popup-label">Status:</span>
                      <span className={`map-status-badge ${getStatusClass(incident.status)}`}>
                        {incident.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <Link to={`/admin/incidents/${incident.id}`} className="map-popup-link">
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default IncidentsMap;