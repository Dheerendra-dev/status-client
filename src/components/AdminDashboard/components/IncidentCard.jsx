import React from 'react'
import { Edit } from 'lucide-react'

const IncidentCard = ({ incident, onEdit }) => {
  return (
    <div className="service-admin-card">
      <div className="service-admin-header">
        <div className="service-admin-info">
          <h3>{incident.title}</h3>
          <p>{incident.description}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <div className={`status-display ${incident.status}`}>
              {incident.status}
            </div>
            <div className={`status-display ${incident.impact}`}>
              {incident.impact} impact
            </div>
          </div>
        </div>
        <div className="service-admin-actions">
          <button
            onClick={() => onEdit(incident)}
            className="action-btn"
            title="Edit Incident"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
        Created: {new Date(incident.createdAt).toLocaleDateString()} • 
        Updated: {new Date(incident.updatedAt).toLocaleDateString()}
      </div>
      {incident.updates && incident.updates.length > 0 && (
        <div style={{ marginTop: '12px', fontSize: '12px' }}>
          <strong>Latest update:</strong> {incident.updates[incident.updates.length - 1].message}
        </div>
      )}
    </div>
  )
}

export default IncidentCard
