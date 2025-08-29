
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

          {/* Only show Admin button when user is authenticated */}
          {user && (
            <button
              onClick={() => onNavigate('admin')}
              className={`nav-button ${currentView === 'admin' ? 'active' : 'secondary'}`}
            >
              <Settings size={16} />
              Admin
            </button>
          )}

          {/* Show login button when not authenticated */}
          {!user && (
            <button
              onClick={() => onNavigate('admin')}
              className="nav-button secondary"
            >
              <Settings size={16} />
              Login
            </button>
          )}

          {/* User info and logout when authenticated */}
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
