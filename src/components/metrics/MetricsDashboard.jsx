import UptimeChart from './UptimeChart'
import UptimeTrendChart from './UptimeTrendChart'
import ServiceStatusPieChart from './ServiceStatusPieChart'

const MetricsDashboard = ({ services, incidents }) => {
  // Calculate overall metrics
  const totalServices = services.length
  const operationalServices = services.filter(s => s.status === 'operational').length
  const averageUptime = services.length > 0 
    ? (services.reduce((sum, service) => sum + service.uptime, 0) / services.length).toFixed(2)
    : 0
  const activeIncidents = incidents.filter(i => i.status !== 'resolved').length

  return (
    <div className="metrics-dashboard">
      <div className="metrics-header">
        <h2 className="metrics-title">Service Metrics & Analytics</h2>
        <p className="metrics-subtitle">
          Comprehensive overview of service performance and uptime statistics
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-cards">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3 className="metric-value">{totalServices}</h3>
            <p className="metric-label">Total Services</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3 className="metric-value">{operationalServices}</h3>
            <p className="metric-label">Operational</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3 className="metric-value">{averageUptime}%</h3>
            <p className="metric-label">Average Uptime</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🚨</div>
          <div className="metric-content">
            <h3 className="metric-value">{activeIncidents}</h3>
            <p className="metric-label">Active Incidents</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Current Uptime Chart */}
        <div className="chart-container">
          <UptimeChart services={services} />
        </div>

        {/* Status Distribution */}
        <div className="chart-container">
          <ServiceStatusPieChart services={services} />
        </div>

        {/* Trend Chart - Full Width */}
        <div className="chart-container chart-full-width">
          <UptimeTrendChart services={services} />
        </div>
      </div>
    </div>
  )
}

export default MetricsDashboard
