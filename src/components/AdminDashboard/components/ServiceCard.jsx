import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

const ServiceCard = ({ service, onEdit, onDelete, loading }) => {
  return (
    <div className="service-admin-card">
      <div className="service-admin-header">
        <div className="service-admin-info">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <div className={`status-display ${service.status}`}>
            {service.status}
          </div>
        </div>
        <div className="service-admin-actions">
          <button
            onClick={() => onEdit(service)}
            className="action-btn"
            title="Edit Service"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="action-btn delete"
            disabled={loading}
            title="Delete Service"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
        Uptime: {service.uptime}% • Last updated: {new Date(service.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  )
}

export default ServiceCard
