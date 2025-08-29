const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  showMessage = true,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  }

  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]}`}>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {showMessage && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
