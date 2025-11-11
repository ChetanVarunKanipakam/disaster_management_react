import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  fetchHotspotsReport,
  fetchResponseTimesReport,
} from '../features/dashboard/dashboardSlice';

import StatCard from '../components/overview/StatCard';
import IncidentBreakdownChart from '../components/overview/IncidentBreakdownChart';
import IncidentHotspotMap from '../components/overview/IncidentHotspotMap';
import './OverviewPage.css';

const OverviewPage = () => {
  const dispatch = useDispatch();
  const { stats, hotspots, responseTimes, status } = useSelector((state) => state.dashboard);

  useEffect(() => {
    // Fetch all dashboard data on component mount
    dispatch(fetchDashboardStats());
    dispatch(fetchHotspotsReport());
    dispatch(fetchResponseTimesReport());
  }, [dispatch]);

  const totalIncidents = stats.incidentCounts.reduce((sum, item) => sum + parseInt(item.count, 10), 0);

  if (status === 'loading' && !stats.recentIncidents.length) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div className="overview-grid">
        <div className="grid-item item-stat-1">
          <StatCard title="Total Incidents" value={totalIncidents} icon="🚨" />
        </div>
        <div className="grid-item item-stat-2">
          <StatCard title="Active Volunteers" value={stats.activeVolunteers} icon="🧑‍🤝‍🧑" />
        </div>
        <div className="grid-item item-stat-3">
          <StatCard
            title="Avg. Resolve Time"
            value={responseTimes.averageResolveTimeMinutes?.toFixed(2)}
            unit="mins"
            icon="⏱️"
          />
        </div>

        <div className="grid-item item-chart-1">
          <IncidentBreakdownChart data={stats.incidentCounts} title="Incidents by Severity" label="Count" />
        </div>
        <div className="grid-item item-chart-2">
          <IncidentBreakdownChart data={stats.incidentStatusCounts} title="Incidents by Status" label="Count" />
        </div>

        <div className="grid-item item-map">
          <IncidentHotspotMap hotspots={hotspots} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;