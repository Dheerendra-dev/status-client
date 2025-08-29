

const IncidentForm = ({
  showIncidentForm,
  editingIncident,
  incidentForm,
  setIncidentForm,
  handleIncidentSubmit,
  resetIncidentForm,
  loading
}) => {
  if (!showIncidentForm) return null

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h3 className="form-title">
            {editingIncident ? 'Edit Incident' : 'Create New Incident'}
          </h3>
          <p className="form-subtitle">
            {editingIncident ? 'Update incident information' : 'Report a new service incident'}
          </p>
        </div>
        <form onSubmit={handleIncidentSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={incidentForm.title}
              onChange={(e) => setIncidentForm({ ...incidentForm, title: e.target.value })}
              className="form-input"
              required
              placeholder="Brief incident title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={incidentForm.description}
              onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
              className="form-textarea"
              required
              placeholder="Detailed description of the incident"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Impact Level</label>
            <select
              value={incidentForm.impact}
              onChange={(e) => setIncidentForm({ ...incidentForm, impact: e.target.value })}
              className="form-select"
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={resetIncidentForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (editingIncident ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IncidentForm
