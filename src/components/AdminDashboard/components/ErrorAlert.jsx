import React from 'react'

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null

  return (
    <div style={{
      background: '#fee2e2',
      color: '#991b1b',
      padding: '12px',
      borderRadius: '6px',
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{error}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#991b1b',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        ×
      </button>
    </div>
  )
}

export default ErrorAlert
