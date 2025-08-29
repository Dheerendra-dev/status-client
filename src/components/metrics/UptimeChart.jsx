import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const UptimeChart = ({ services }) => {
  // Prepare data for the chart
  const chartData = services.map(service => ({
    name: service.name.length > 15 ? service.name.substring(0, 15) + '...' : service.name,
    fullName: service.name,
    uptime: service.uptime,
    status: service.status
  }))

  // Color mapping based on uptime percentage
  const getBarColor = (uptime, status) => {
    if (status === 'major') return '#dc2626' // Red for major outages
    if (status === 'partial') return '#ea580c' // Orange for partial outages
    if (status === 'degraded') return '#d97706' // Amber for degraded
    if (uptime >= 99.5) return '#10b981' // Green for excellent uptime
    if (uptime >= 99) return '#f59e0b' // Yellow for good uptime
    if (uptime >= 95) return '#f97316' // Orange for poor uptime
    return '#ef4444' // Red for very poor uptime
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="uptime-tooltip">
          <p className="tooltip-title">{data.fullName}</p>
          <p className="tooltip-uptime">
            <span className="tooltip-label">Uptime: </span>
            <span className="tooltip-value">{data.uptime}%</span>
          </p>
          <p className="tooltip-status">
            <span className="tooltip-label">Status: </span>
            <span className={`tooltip-status-${data.status}`}>{data.status}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="uptime-chart-container">
      <div className="chart-header">
        <h3 className="chart-title">Service Uptime Overview</h3>
        <p className="chart-subtitle">Current uptime percentage for all services</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
            stroke="#64748b"
          />
          <YAxis
            domain={[90, 100]}
            fontSize={12}
            stroke="#64748b"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="uptime" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.uptime, entry.status)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Excellent (≥99.5%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Good (≥99%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f97316' }}></div>
          <span>Poor (≥95%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Critical (&lt;95%)</span>
        </div>
      </div>
    </div>
  )
}

export default UptimeChart
