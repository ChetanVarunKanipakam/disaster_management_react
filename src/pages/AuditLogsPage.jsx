import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuditLogs } from '../features/auditlogs/auditLogsSlice';

const AuditLogsPage = () => {
  const dispatch = useDispatch();
  const { logs, status } = useSelector((state) => state.auditlogs);

  useEffect(() => {
    dispatch(fetchAuditLogs());
  }, [dispatch]);

  return (
    <div>
      <h1>System Audit Logs</h1>
      <p>Tracks important actions performed by administrators.</p>
      {status === 'loading' && <p>Loading logs...</p>}
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.admin?.name || 'N/A'}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogsPage;