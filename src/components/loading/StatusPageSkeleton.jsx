import SkeletonText from './SkeletonText'
import SkeletonGrid from './SkeletonGrid'

const StatusPageSkeleton = () => {
  return (
    <div className="status-page-skeleton">
      {/* Header Skeleton */}
      <div className="skeleton-header-section">
        <div className="skeleton-hero">
          <SkeletonText width="300px" height="32px" className="skeleton-title" />
          <SkeletonText width="500px" height="18px" className="skeleton-subtitle" />
          <div className="skeleton-status-badge"></div>
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="skeleton-metrics-section">
        <div className="skeleton-metrics-grid">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton-metric-card">
              <SkeletonText width="80px" height="14px" />
              <SkeletonText width="60px" height="28px" />
              <SkeletonText width="100px" height="12px" />
            </div>
          ))}
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="skeleton-services-section">
        <SkeletonText width="200px" height="24px" className="skeleton-section-title" />
        <div className="skeleton-services-list">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton-service-item">
              <div className="skeleton-service-info">
                <SkeletonText width="150px" height="18px" />
                <SkeletonText width="250px" height="14px" />
              </div>
              <div className="skeleton-service-status">
                <div className="skeleton-badge"></div>
                <SkeletonText width="60px" height="12px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents Skeleton */}
      <div className="skeleton-incidents-section">
        <SkeletonText width="180px" height="24px" className="skeleton-section-title" />
        <div className="skeleton-incident-card">
          <SkeletonText width="300px" height="20px" />
          <SkeletonText lines={2} />
          <div className="skeleton-incident-meta">
            <div className="skeleton-badge"></div>
            <div className="skeleton-badge"></div>
            <SkeletonText width="120px" height="12px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusPageSkeleton
