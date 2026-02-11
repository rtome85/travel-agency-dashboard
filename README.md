# TourVisto - AI-Powered Travel Agency Dashboard

A modern, full-stack travel agency management platform built with React Router v7, featuring AI-powered trip generation, real-time analytics, and comprehensive travel planning tools.

[![React Router](https://img.shields.io/badge/React_Router-v7.5.3-red.svg)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

### AI-Powered Trip Generation

- **Intelligent Itinerary Creation**: Leverages Ollama (GPT-OSS 120B) or Google Gemini AI to generate customized travel itineraries based on user preferences
- **Smart Planning**: Considers budget, travel style, interests, group type, and duration to create personalized experiences
- **Visual Integration**: Automatically fetches relevant destination images from Unsplash API

### Comprehensive Dashboard

- **Real-Time Analytics**: Track user growth, trip trends, and active users with interactive Syncfusion charts
- **Key Metrics**: Monitor total users, trips created, and monthly growth statistics
- **Visual Data Presentation**: Column charts, spline area charts, and data grids for comprehensive insights

### Trip Management

- **Complete CRUD Operations**: Create, view, update, and delete travel itineraries
- **Detailed Trip Information**:
  - Day-by-day itinerary with activities
  - Weather information and best time to visit
  - Location coordinates and OpenStreetMap integration
  - Budget breakdown and estimated pricing
  - High-quality destination imagery

### User Management

- **Authentication System**: Secure sign-in with Appwrite authentication
- **User Analytics**: Track user signups, itinerary creation count, and engagement metrics
- **Role-Based Access**: Admin dashboard for managing users and trips

### Modern UI/UX

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Professional Components**: Syncfusion EJ2 components for charts, grids, and data visualization
- **Intuitive Navigation**: Clean layout with sidebar navigation and mobile menu support

## Tech Stack

### Frontend

- **Framework**: [React Router v7](https://reactrouter.com/) - Modern full-stack React framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Syncfusion EJ2 React](https://www.syncfusion.com/react-components) - Enterprise-grade UI components
  - Charts (Column, SplineArea)
  - Data Grids with custom templates
  - Interactive maps and navigation components

### Backend & Services

- **Backend as a Service**: [Appwrite](https://appwrite.io/) - Database, authentication, and storage
- **AI Models**:
  - [Ollama Cloud](https://ollama.com/) - GPT-OSS 120B model for trip generation
  - [Google Generative AI](https://ai.google.dev/) - Gemini 2.0 Flash (fallback option)
- **Image Service**: [Unsplash API](https://unsplash.com/developers) - High-quality travel imagery

### Developer Tools

- **Build Tool**: [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- **Monitoring**: [Sentry](https://sentry.io/) - Error tracking and performance monitoring
- **Package Manager**: npm

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher)
- **npm** or **pnpm** or **bun**

You'll also need accounts and API keys for:

- [Appwrite](https://cloud.appwrite.io/) - Backend services
- [Ollama Cloud](https://ollama.com/) or [Google AI Studio](https://ai.google.dev/) - AI model access
- [Unsplash](https://unsplash.com/developers) - Image API
- [Syncfusion](https://www.syncfusion.com/account/claim-license-key) - Free community license

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tourvisto.git
cd tourvisto
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Services
GEMINI_API_KEY=your_gemini_api_key_here
OLLAMA_API_KEY=your_ollama_api_key_here

# Image Service
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Appwrite Configuration
VITE_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_API_KEY=your_api_key
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
VITE_APPWRITE_TRIPS_COLLECTION_ID=your_trips_collection_id

# Syncfusion License
VITE_SYNCFUSION_LICENSE_KEY=your_syncfusion_license_key
```

### 4. Set Up Appwrite Backend

1. Create a new project in [Appwrite Cloud](https://cloud.appwrite.io/) or self-hosted instance

2. Create a database with two collections:

   **Users Collection**:

   - `name` (String)
   - `email` (String)
   - `imageUrl` (String, optional)
   - `itineraryCount` (Integer, default: 0)

   **Trips Collection**:

   - `tripDetail` (String/JSON) - Stores complete trip information
   - `imageUrls` (Array of Strings)
   - `createdAt` (DateTime)
   - `userId` (String, optional)

3. Configure authentication methods (Email/Password, OAuth, etc.)

4. Update your `.env.local` with the collection IDs

## Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory:

```
build/
├── client/     # Static assets (HTML, CSS, JS)
└── server/     # Server-side code
```

### Running Production Build

Start the production server:

```bash
npm start
```

## Project Structure

```
tourvisto/
├── app/
│   ├── appwrite/              # Appwrite integration
│   │   ├── auth.ts            # Authentication functions
│   │   ├── client.ts          # Appwrite client configuration
│   │   ├── dashboard.ts       # Dashboard data queries
│   │   └── trips.ts           # Trip CRUD operations
│   ├── constants/             # Application constants
│   │   ├── index.ts           # Chart configurations, constants
│   │   └── world_map.ts       # World map data for visualizations
│   ├── lib/
│   │   └── utils.ts           # Utility functions (parsing, formatting)
│   ├── routes/
│   │   ├── admin/             # Admin dashboard routes
│   │   │   ├── admin-layout.tsx    # Admin layout wrapper
│   │   │   ├── dashboard.tsx       # Main dashboard page
│   │   │   ├── trips.tsx           # Trip listing page
│   │   │   ├── create-trip.tsx     # Trip creation form
│   │   │   ├── trip-detail.tsx     # Single trip view
│   │   │   └── all-users.tsx       # User management
│   │   ├── api/               # API routes
│   │   │   └── create-trip.ts      # AI trip generation endpoint
│   │   └── root/              # Public routes
│   │       ├── page-layout.tsx     # Public page layout
│   │       ├── sign-in.tsx         # Authentication page
│   │       └── travel-page.tsx     # Landing page (optional)
│   ├── routes.ts              # Route configuration
│   ├── root.tsx               # Root application component
│   ├── entry.client.tsx       # Client entry point
│   └── entry.server.tsx       # Server entry point
├── components/                # Reusable React components
│   ├── Header.tsx             # Page header component
│   ├── StatsCard.tsx          # Statistics card component
│   ├── TripCard.tsx           # Trip preview card
│   ├── NavItems.tsx           # Navigation menu items
│   ├── MobileSideBar.tsx      # Mobile navigation
│   ├── RootNavbar.tsx         # Public navigation bar
│   ├── InfoPill.tsx           # Info badge component
│   └── index.ts               # Component exports
├── public/                    # Static assets
│   └── assets/
│       ├── icons/             # SVG icons
│       └── images/            # Static images
├── .env.local                 # Environment variables
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── react-router.config.ts     # React Router configuration
└── Dockerfile                 # Docker containerization
```

## Key Features Explained

### AI Trip Generation Workflow

1. **User Input**: Users provide trip parameters (destination, duration, budget, interests, travel style, group type)
2. **AI Processing**: Request sent to Ollama Cloud (GPT-OSS 120B) or Google Gemini AI
3. **Structured Output**: AI returns comprehensive trip data including:
   - Personalized itinerary with day-by-day activities
   - Estimated pricing in EUR
   - Weather information by season
   - Best time to visit recommendations
   - Location coordinates and OpenStreetMap links
4. **Image Enhancement**: Relevant destination images fetched from Unsplash
5. **Data Storage**: Complete trip data saved to Appwrite database

### Dashboard Analytics

- **User Growth Chart**: Column and spline area charts showing daily user registration trends
- **Trip Trends**: Analysis of trips created by travel style (Adventure, Luxury, Budget, Cultural, etc.)
- **Latest Users**: Grid displaying recent signups with their trip creation count
- **Interest Analysis**: Breakdown of trips by interests (Nature, Food, History, etc.)

### Route Structure

- **Public Routes**:
  - `/sign-in` - Authentication page

- **Admin Routes** (Authenticated):
  - `/` - Dashboard with analytics
  - `/all-users` - User management
  - `/trips` - Trip listing with pagination
  - `/trips/create` - AI-powered trip creation
  - `/trips/:tripId` - Detailed trip view

- **API Routes**:
  - `/api/create-trip` - POST endpoint for AI trip generation

## Deployment

### Docker Deployment

Build and run using Docker:

```bash
# Build the Docker image
docker build -t tourvisto .

# Run the container
docker run -p 3000:3000 --env-file .env.local tourvisto
```

### Supported Platforms

The application can be deployed to any Node.js hosting platform:

- **AWS ECS** - Elastic Container Service
- **Google Cloud Run** - Serverless container platform
- **Azure Container Apps** - Containerized applications
- **Vercel** - Zero-configuration deployment
- **Railway** - Platform as a Service
- **Fly.io** - Distributed application hosting
- **Digital Ocean App Platform** - Managed application hosting

### Environment Variables in Production

Ensure all environment variables are properly configured in your deployment platform's settings. Never commit `.env.local` to version control.

## Configuration

### Switching AI Providers

The application currently uses Ollama Cloud by default. To switch to Google Gemini:

1. Open `app/routes/api/create-trip.ts`
2. Comment out the Ollama implementation (lines 74-85)
3. Uncomment the Gemini implementation (lines 70-72)
4. Ensure `GEMINI_API_KEY` is set in your environment variables

```typescript
// Use Gemini instead
const textResult = await genAI
    .getGenerativeModel({ model: "gemini-2.0-flash" })
    .generateContent([prompt]);
```

### Customizing Charts

Chart configurations are stored in `app/constants/index.ts`. Modify axis settings, colors, and tooltips to match your branding.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting conventions
- Run `npm run typecheck` before committing
- Write meaningful commit messages

## Troubleshooting

### Common Issues

**Issue**: Syncfusion license warning
**Solution**: Obtain a free community license from [Syncfusion](https://www.syncfusion.com/account/claim-license-key) and add it to your `.env.local`

**Issue**: Appwrite connection errors
**Solution**: Verify your Appwrite endpoint and project ID are correct, and check network connectivity

**Issue**: AI generation fails
**Solution**: Check API key validity and rate limits for Ollama Cloud or Gemini API

**Issue**: Images not loading
**Solution**: Verify Unsplash API key and check request rate limits (50 requests/hour for free tier)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Router Team](https://reactrouter.com/) - For the excellent full-stack framework
- [Appwrite](https://appwrite.io/) - For the comprehensive backend platform
- [Syncfusion](https://www.syncfusion.com/) - For professional UI components
- [Ollama](https://ollama.com/) - For accessible AI model hosting
- [Unsplash](https://unsplash.com/) - For beautiful, free travel imagery

## Contact & Support

For questions, issues, or suggestions:

- Open an issue on [GitHub Issues](https://github.com/yourusername/tourvisto/issues)
- Reach out via email: contact@robtome.com

---

Built with ❤️ using React Router v7 and modern web technologies
