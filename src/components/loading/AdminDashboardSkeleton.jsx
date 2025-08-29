import SkeletonText from './SkeletonText'
import SkeletonGrid from './SkeletonGrid'

const AdminDashboardSkeleton = () => {
  return (
    <div className="admin-dashboard-skeleton">
      {/* Header Skeleton */}
      <div className="skeleton-admin-header">
        <SkeletonText width="250px" height="28px" />
        <SkeletonText width="400px" height="16px" />
        <div className="skeleton-refresh-button"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="skeleton-tabs">
        <div className="skeleton-tab active"></div>
        <div className="skeleton-tab"></div>
      </div>

      {/* Section Header Skeleton */}
      <div className="skeleton-section-header">
        <SkeletonText width="120px" height="20px" />
        <div className="skeleton-add-button"></div>
      </div>

      {/* Grid Skeleton */}
      <SkeletonGrid count={6} className="admin-skeleton-grid" />
    </div>
  )
}

export default AdminDashboardSkeleton
