
import { UptimeChart } from './metrics'
import {
  calculateOverallUptime,
  calculateAverageResponseTime,
  countThisMonthIncidents,
  getLastUpdateTime,
  getMetricClass,
  getOverallSystemStatus
} from '../utils/statusCalculations'

const StatusPage = ({ services, incidents }) => {
  // Calculate dynamic metrics using utility functions
  const activeIncidents = incidents.filter(i => i.status !== 'resolved')
  const overallUptime = calculateOverallUptime(services)
  const averageResponseTime = calculateAverageResponseTime(services)
  const thisMonthIncidents = countThisMonthIncidents(incidents)
  const lastUpdateTime = getLastUpdateTime(services, incidents)
  const systemStatus = getOverallSystemStatus(services, incidents)

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'Operational'
      case 'degraded':
        return 'Degraded Performance'
      case 'partial':
        return 'Partial Outage'
      case 'major':
        return 'Major Outage'
      default:
        return 'Unknown'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="status-header">
        <h1 className="status-title">System Status</h1>
        <p className="status-subtitle">
          {activeIncidents.length > 0 ? 'Some systems experiencing issues' : 'All systems operational'}
        </p>

        <div className="overall-status">
          <span>{systemStatus === 'operational' ? '✅' : systemStatus === 'degraded' ? '⚠️' : '🚨'}</span>
          {getStatusText(systemStatus)}
        </div>

        <div className="status-metrics">
          <div className="status-metric">
            <span>👥</span>
            {services.length} Services
          </div>
          <div className="status-metric">
            <span>📈</span>
            {overallUptime}% Uptime
          </div>
          <div className="status-metric">
            <span>🕒</span>
            Updated {lastUpdateTime}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="metrics-section">
        <h2 className="section-title">System Metrics</h2>
        <p className="section-subtitle">Performance overview of our infrastructure</p>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-title">Overall Uptime</div>
            <div className={`metric-value ${getMetricClass(overallUptime, 'uptime')}`}>
              {overallUptime}%
            </div>
            <div className="metric-subtitle">Average across all services</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Response Time</div>
            <div className={`metric-value ${getMetricClass(averageResponseTime, 'responseTime')}`}>
              {averageResponseTime}ms
            </div>
            <div className="metric-subtitle">Average API response</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Incidents Resolved</div>
            <div className="metric-value">{thisMonthIncidents}</div>
            <div className="metric-subtitle">This month</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Active Incidents</div>
            <div className={`metric-value ${getMetricClass(activeIncidents.length, 'incidents')}`}>
              {activeIncidents.length}
            </div>
            <div className="metric-subtitle">Currently ongoing</div>
          </div>
        </div>
      </div>


      {/* Services Status */}
      <div className="content-section">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">Current status of all our services and systems</p>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <span className={`status-badge ${service.status}`}>
                  {getStatusText(service.status)}
                </span>
              </div>

              <div className="service-metrics">
                <div className="service-uptime">
                  <span>📈</span>
                  99.98% uptime
                </div>
                <div className="service-updated">
                  <span>🕒</span>
                  Updated 2 minutes ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Incidents - Minimal Design */}
      <div className="incidents-section">
        <h2 className="section-title">Active Incidents</h2>
        <p className="section-subtitle">Current issues affecting our services</p>

        <div className="incidents-container">
          {/* Sample Critical Incident */}
          <div className="incident-card">
            <div className="incident-header">
              <div className="incident-title-section">
                <div className="incident-title-row">
                  <span className="incident-icon">⚠️</span>
                  <h3 className="incident-title">API Response Times Elevated</h3>
                </div>
                <div className="incident-meta">
                  <span className="incident-services-tag">API Gateway</span>
                  <span className="incident-impact-badge critical">Critical</span>
                </div>
              </div>
              <div className="incident-status-section">
                <div className="incident-status-badge">Investigating</div>
                <div className="incident-time">29/08/2025, 10:36:39</div>
              </div>
            </div>

            <div className="latest-update-section">
              <div className="latest-update-title">Latest Update</div>
              <div className="latest-update-message">
                We are investigating elevated response times and working on a resolution.
              </div>
              <div className="latest-update-time">29/08/2025, 10:36:39</div>
            </div>
          </div>

          {/* Show actual incidents if any */}
          {activeIncidents.map(incident => (
            <div key={incident.id} className="incident-card">
              <div className="incident-header">
                <div className="incident-title-section">
                  <div className="incident-title-row">
                    <span className="incident-icon">⚠️</span>
                    <h3 className="incident-title">{incident.title}</h3>
                  </div>
                  <div className="incident-meta">
                    <span className="incident-services-tag">Multiple Services</span>
                    <span className={`incident-impact-badge ${incident.impact}`}>{incident.impact}</span>
                  </div>
                </div>
                <div className="incident-status-section">
                  <div className="incident-status-badge">{incident.status}</div>
                  <div className="incident-time">{new Date(incident.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="latest-update-section">
                <div className="latest-update-title">Latest Update</div>
                <div className="latest-update-message">
                  {incident.updates && incident.updates.length > 0
                    ? incident.updates[incident.updates.length - 1].message
                    : 'We are investigating this incident and will provide updates as they become available.'}
                </div>
                <div className="latest-update-time">
                  {incident.updates && incident.updates.length > 0
                    ? new Date(incident.updates[incident.updates.length - 1].createdAt).toLocaleString()
                    : new Date(incident.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Section */}
      {services.length > 0 && (
        <div className="status-metrics-section">
          <div className="container">
            <h2 className="section-title">Service Performance</h2>
            <div className="metrics-chart-container">
              <UptimeChart services={services} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default StatusPage
