const RefreshButton = ({ onRefresh, loading }) => {
  if (!onRefresh) return null

  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="btn btn-secondary"
      style={{ marginTop: '16px' }}
    >
      {loading ? 'Refreshing...' : 'Refresh Data'}
    </button>
  )
}

export default RefreshButton
