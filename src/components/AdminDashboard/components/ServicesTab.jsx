import { Plus } from 'lucide-react'
import ServiceCard from './ServiceCard'
import EmptyState from './EmptyState'
import SectionHeader from './SectionHeader'

const ServicesTab = ({
  services,
  onAddService,
  onEditService,
  onDeleteService,
  loading
}) => {
  return (
    <div className="admin-section">
      <SectionHeader
        title="Services"
        buttonText="Add Service"
        buttonIcon={Plus}
        onButtonClick={onAddService}
      />

      {/* Services List */}
      {services.length === 0 ? (
        <EmptyState
          title="No services yet"
          description="Create your first service to start monitoring your infrastructure."
        />
      ) : (
        <div className="services-admin-grid">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={onEditService}
              onDelete={onDeleteService}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServicesTab
