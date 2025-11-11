import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidents } from '../features/incidents/incidentsSlice';
import IncidentsList from '../components/incidents/IncidentsList';
import IncidentsMap from '../components/incidents/IncidentsMap';
import Papa from 'papaparse';
import {jsPDF} from 'jspdf';
import { applyPlugin } from 'jspdf-autotable'

import './ListPage.css'; // New CSS file for this page

const IncidentsListPage = () => {
  const dispatch = useDispatch();
  const { list: incidents, status, error } = useSelector((state) => state.incidents);
  
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filters, setFilters] = useState({
    status: 'PENDING',
    severity: 'HIGH'
  });

  useEffect(() => {
    // Construct query params from non-empty filters
    const queryParams = Object.entries(filters)
      .filter(([, value]) => value !== '')
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, { limit: 20, offset: 0 }); // Add pagination params

    dispatch(fetchIncidents(queryParams));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleExportCSV = () => {
    const csv = Papa.unparse(incidents);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'incidents.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleExportPDF = () => {
    applyPlugin(jsPDF)
    const doc = new jsPDF();
    doc.autoTable({ // This should now work!
      head: [['ID', 'Title', 'Status', 'Severity', 'Type', 'Reported At']],
      body: incidents.rows.map(i => [
        i.id.substring(0, 8), // Shorten UUID for table
        i.title,
        i.status,
        i.severity,
        i.type,
        new Date(i.createdAt).toLocaleDateString()
      ]),
    });
    doc.save('incidents.pdf');
  };

  return (
    <div className="lp-page">
      <div className="lp-header card">
        <div>
          <h1 className="lp-title">Incident Management</h1>
          <p className="lp-sub">Overview · monitor incidents · export reports</p>
        </div>

        <div className="lp-actions">
          <button className="btn btn-outline" onClick={handleExportCSV}>Export CSV</button>
          <button className="btn btn-primary" onClick={handleExportPDF}>Export PDF</button>
        </div>
      </div>

      <div className="lp-controls">
        <div className="lp-filters card">
            <label className="lbl">
              <span>Status</span>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="select">
                  <option value="">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
              </select>
            </label>

            <label className="lbl">
              <span>Severity</span>
              <select name="severity" value={filters.severity} onChange={handleFilterChange} className="select">
                  <option value="">All Severities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
              </select>
            </label>

            {/* Add a type filter if you have types, e.g., FIRE, FLOOD */}
        </div>

        <div className="lp-view card">
            <div className="view-toggle">
              <button onClick={() => setViewMode('list')} className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}>List</button>
              <button onClick={() => setViewMode('map')} className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}>Map</button>
            </div>
        </div>
      </div>

      {status === 'loading' && <div className="lp-status">Loading incidents...</div>}
      {status === 'failed' && <div className="lp-status lp-error">Error: {error}</div>}
      
      <div className="lp-content">
        {viewMode === 'list' ? (
          <div className="lp-panel card">
            <IncidentsList incidents={incidents} />
          </div>
        ) : (
          <div className="lp-panel card">
            <IncidentsMap incidents={incidents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentsListPage;
