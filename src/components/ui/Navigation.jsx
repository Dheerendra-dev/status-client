import React from 'react'
import { Activity, Settings, LogOut } from 'lucide-react'

const Navigation = ({ 
  currentView, 
  onNavigate, 
  user, 
  onLogout 
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Activity size={32} />
          StatusPage
        </div>
        <div className="nav-links">
          <button
            onClick={() => onNavigate('status')}
            className={`nav-button ${currentView === 'status' ? 'active' : 'secondary'}`}
          >
            Status Page
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`nav-button ${currentView === 'admin' ? 'active' : 'secondary'}`}
          >
            <Settings size={16} />
            Admin
          </button>
          {user && (
            <>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                Welcome, {user.name}
              </span>
              <button
                onClick={onLogout}
                className="nav-button secondary"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
