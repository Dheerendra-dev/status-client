import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const UptimeTrendChart = ({ services }) => {
  // Generate mock historical data for the last 30 days
  const generateHistoricalData = () => {
    const data = []
    const today = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const dataPoint = {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0]
      }
      
      // Add uptime data for each service with some realistic variation
      services.forEach(service => {
        const baseUptime = service.uptime
        const variation = (Math.random() - 0.5) * 2 // ±1% variation
        const dailyUptime = Math.max(90, Math.min(100, baseUptime + variation))
        dataPoint[service.name] = Number(dailyUptime.toFixed(2))
      })
      
      data.push(dataPoint)
    }
    
    return data
  }

  const chartData = generateHistoricalData()

  // Color palette for different services
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
  ]

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="trend-tooltip">
          <p className="tooltip-title">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-line">
              <span 
                className="tooltip-color-indicator" 
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="tooltip-service">{entry.dataKey}: </span>
              <span className="tooltip-value">{entry.value}%</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="uptime-trend-chart-container">
      <div className="chart-header">
        <h3 className="chart-title">30-Day Uptime Trend</h3>
        <p className="chart-subtitle">Historical uptime performance over the last 30 days</p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            stroke="#64748b"
          />
          <YAxis 
            domain={[95, 100]}
            fontSize={12}
            stroke="#64748b"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {services.map((service, index) => (
            <Line
              key={service.id}
              type="monotone"
              dataKey={service.name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UptimeTrendChart
