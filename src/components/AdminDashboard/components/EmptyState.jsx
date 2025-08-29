import React from 'react'

const EmptyState = ({ title, description }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      color: '#64748b',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default EmptyState
