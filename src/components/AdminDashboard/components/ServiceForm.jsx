import React from 'react'

const ServiceForm = ({
  showServiceForm,
  editingService,
  serviceForm,
  setServiceForm,
  handleServiceSubmit,
  resetServiceForm,
  loading
}) => {
  if (!showServiceForm) return null

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h3 className="form-title">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <p className="form-subtitle">
            {editingService ? 'Update service information' : 'Create a new service to monitor'}
          </p>
        </div>
        <form onSubmit={handleServiceSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={serviceForm.name}
              onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
              className="form-input"
              required
              placeholder="e.g., API Gateway"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              className="form-textarea"
              placeholder="Brief description of the service"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={serviceForm.status}
              onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
              className="form-select"
            >
              <option value="operational">Operational</option>
              <option value="degraded">Degraded Performance</option>
              <option value="partial">Partial Outage</option>
              <option value="major">Major Outage</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={resetServiceForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (editingService ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceForm
