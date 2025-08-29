# StatusPage - Service Status Management Application

A modern, responsive status page application built with React and Vite, similar to services like StatusPage, Cachet, or Betterstack. This application allows administrators to manage services and their statuses while providing a public-facing page for users to view the current status of all services.

## 🚀 Features

### Core Features

- **Service Management**: Full CRUD operations for services with status tracking
- **Incident Management**: Create, update, and resolve incidents with service associations
- **Public Status Page**: Clean, responsive interface showing current service statuses
- **Admin Dashboard**: Comprehensive management interface for services and incidents
- **Authentication**: Simple login system for admin access
- **Real-time Updates**: Live status updates (simulated)
- **Responsive Design**: Mobile-friendly interface with clean Linear-style design

### Service Status Types

- **Operational**: Service is running normally
- **Degraded Performance**: Service is running but with reduced performance
- **Partial Outage**: Some features of the service are unavailable
- **Major Outage**: Service is completely unavailable

### Incident Management

- **Status Tracking**: Investigating → Identified → Monitoring → Resolved
- **Impact Levels**: Minor, Major, Critical
- **Service Association**: Link incidents to affected services
- **Update Timeline**: Track incident progress with timestamped updates

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 3
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React useState (simple and effective)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites

- Node.js 14.18+ (compatible with Node 14.17.3+)
- npm 6+

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Plive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Usage

### Public Status Page

- Visit the main page to see current service statuses
- View active incidents and their updates
- See overall system health at a glance

### Admin Access

1. Click the "Admin" button in the navigation
2. Login with any email and password (demo authentication)
3. Manage services and incidents from the dashboard

### Managing Services

- **Add Service**: Click "Add Service" and fill in the details
- **Update Status**: Edit existing services to change their status
- **Delete Service**: Remove services that are no longer needed

### Managing Incidents

- **Create Incident**: Click "Create Incident" and provide details
- **Update Incident**: Edit incident status and add updates
- **Associate Services**: Link incidents to affected services
- **Resolve Incident**: Mark incidents as resolved when fixed

## 🏗️ Project Structure

```
src/
├── components/
│   ├── StatusPage.jsx          # Public status page
│   ├── AdminDashboard.jsx      # Admin management interface
│   ├── LoginForm.jsx           # Authentication form
│   ├── ServiceForm.jsx         # Service creation/editing
│   └── IncidentForm.jsx        # Incident creation/editing
├── lib/
│   └── utils.js                # Utility functions
├── types/
│   └── index.js                # Data type definitions
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles with Tailwind
```

## 🎨 Design Philosophy

The application follows a clean, minimalistic design inspired by Linear, focusing on:

- **Clarity**: Clear visual hierarchy and status indicators
- **Simplicity**: Intuitive interface with minimal cognitive load
- **Responsiveness**: Works seamlessly across all device sizes
- **Accessibility**: Proper color contrast and semantic HTML

## 🔧 Configuration

### Tailwind CSS

The application uses Tailwind CSS with custom color schemes for status indicators:

- Green: Operational services
- Yellow: Degraded performance
- Orange: Partial outages
- Red: Major outages

### Environment Setup

No environment variables required for basic functionality. The application uses mock data and simulated authentication for demonstration purposes.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The application builds to static files and can be deployed to any static hosting service.

## 🔮 Future Enhancements

- **Real WebSocket Integration**: Replace simulated updates with actual WebSocket connections
- **Email Notifications**: Send alerts when incidents are created or resolved
- **Metrics & Analytics**: Add uptime percentage and performance graphs
- **API Integration**: Connect to external monitoring services
- **Multi-tenancy**: Support for multiple organizations
- **Advanced Authentication**: Integration with Auth0, Clerk, or similar services
- **Scheduled Maintenance**: Plan and communicate maintenance windows
- **Status History**: Historical view of service status changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by StatusPage, Cachet, and Betterstack
- Built with modern React patterns and best practices
- Designed for simplicity and effectiveness

---

**Built with ❤️ using AI-first development practices and modern web technologies.**
