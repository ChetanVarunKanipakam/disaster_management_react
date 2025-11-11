import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, unit, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-info">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value ?? '...'} <span className="stat-card-unit">{unit}</span></span>
      </div>
    </div>
  );
};

export default StatCard;