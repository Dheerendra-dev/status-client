const AdminTabs = ({
  activeTab,
  setActiveTab,
  servicesCount,
  incidentsCount
}) => {
  return (
    <div className="admin-tabs">
      <button
        onClick={() => setActiveTab('services')}
        className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
      >
        Services ({servicesCount})
      </button>
      <button
        onClick={() => setActiveTab('incidents')}
        className={`admin-tab ${activeTab === 'incidents' ? 'active' : ''}`}
      >
        Incidents ({incidentsCount})
      </button>
      <button
        onClick={() => setActiveTab('metrics')}
        className={`admin-tab ${activeTab === 'metrics' ? 'active' : ''}`}
      >
        📊 Metrics
      </button>
    </div>
  )
}

export default AdminTabs
