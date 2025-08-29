import React from 'react'

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      fontSize: '16px',
      color: '#ef4444',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <p>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay
