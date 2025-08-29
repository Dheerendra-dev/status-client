const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-long"></div>
        <div className="skeleton-line skeleton-line-medium"></div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-line skeleton-line-short"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
