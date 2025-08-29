import SkeletonCard from './SkeletonCard'

const SkeletonGrid = ({ count = 6, className = '' }) => {
  return (
    <div className={`skeleton-grid ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export default SkeletonGrid
