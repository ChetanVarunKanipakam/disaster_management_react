import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const IncidentsMap = ({ incidents }) => {
  const incidents1=incidents.rows;
  const defaultPosition = [40.7128, -74.0060]; // Default to NYC, change as needed

  if (!incidents1 || incidents1.length === 0) {
    return <p>No incident locations to display.</p>;
  }

  // Find the center of the map based on the incidents1
  const center = incidents1[0]?.location?.coordinates ? 
    [incidents1[0].location.coordinates[1], incidents1[0].location.coordinates[0]] : 
    defaultPosition;

  return (
    <MapContainer center={center} zoom={10} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {incidents1.map(incident => {
        const position = [incident.location.coordinates[1], incident.location.coordinates[0]];
        return (
          <Marker key={incident.id} position={position}>
            <Popup>
              <strong>{incident.title}</strong><br/>
              Severity: {incident.severity}<br/>
              Status: {incident.status}<br/>
              <Link to={`/incidents/${incident.id}`}>View Details</Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default IncidentsMap;