import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const ServiceStatusPieChart = ({ services }) => {
  // Calculate status distribution
  const statusCounts = services.reduce((acc, service) => {
    acc[service.status] = (acc[service.status] || 0) + 1
    return acc
  }, {})

  // Prepare data for pie chart
  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    percentage: ((count / services.length) * 100).toFixed(1)
  }))

  // Color mapping for different statuses
  const statusColors = {
    'Operational': '#10b981',
    'Degraded': '#f59e0b',
    'Partial': '#f97316',
    'Major': '#ef4444'
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="pie-tooltip">
          <p className="tooltip-title">{data.name}</p>
          <p className="tooltip-value">{data.value} services ({data.percentage}%)</p>
        </div>
      )
    }
    return null
  }

  // Custom label function
  const renderLabel = ({ name, percentage }) => {
    return `${name}: ${percentage}%`
  }

  return (
    <div className="service-status-pie-container">
      <div className="chart-header">
        <h3 className="chart-title">Service Status Distribution</h3>
        <p className="chart-subtitle">Current status breakdown of all services</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={statusColors[entry.name] || '#64748b'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Status summary */}
      <div className="status-summary">
        {pieData.map((item, index) => (
          <div key={index} className="status-item">
            <div
              className="status-indicator"
              style={{ backgroundColor: statusColors[item.name] || '#64748b' }}
            ></div>
            <span className="status-name">{item.name}</span>
            <span className="status-count">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceStatusPieChart
