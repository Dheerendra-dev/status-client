const SkeletonText = ({ 
  lines = 1, 
  width = '100%', 
  height = '16px',
  className = '' 
}) => {
  if (lines === 1) {
    return (
      <div 
        className={`skeleton-line ${className}`}
        style={{ width, height }}
      ></div>
    )
  }

  return (
    <div className={`skeleton-text-block ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div 
          key={index}
          className="skeleton-line"
          style={{ 
            width: index === lines - 1 ? '70%' : '100%',
            height,
            marginBottom: index === lines - 1 ? 0 : '8px'
          }}
        ></div>
      ))}
    </div>
  )
}

export default SkeletonText
