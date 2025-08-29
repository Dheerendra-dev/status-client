import React from 'react'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      fontSize: '18px',
      color: '#64748b'
    }}>
      {message}
    </div>
  )
}

export default LoadingSpinner
