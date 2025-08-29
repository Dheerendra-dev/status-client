import { AlertCircle } from 'lucide-react'
import IncidentCard from './IncidentCard'
import EmptyState from './EmptyState'
import SectionHeader from './SectionHeader'

const IncidentsTab = ({
  incidents,
  onAddIncident,
  onEditIncident
}) => {
  return (
    <div className="admin-section">
      <SectionHeader
        title="Incidents"
        buttonText="Create Incident"
        buttonIcon={AlertCircle}
        onButtonClick={onAddIncident}
        buttonStyle={{ background: '#dc2626', borderColor: '#dc2626' }}
      />

      {/* Incidents List */}
      {incidents.length === 0 ? (
        <EmptyState
          title="No incidents"
          description="No active incidents. Your services are running smoothly!"
        />
      ) : (
        <div className="services-admin-grid">
          {incidents.map(incident => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onEdit={onEditIncident}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default IncidentsTab
