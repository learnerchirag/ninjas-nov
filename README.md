# Ninja Database

A modern React single-page application for managing and viewing ninja data with advanced filtering, sorting, and search capabilities.

## Features

- 📊 **Interactive Data Table** - Built with TanStack Table for high performance (1000+ rows)
- 🔍 **Global Search** - Filter ninjas across all fields
- ⚡ **Power Sorting** - Sort by power level with visual indicators
- 💊 **Health Filter** - Multi-select filter for health status (Healthy, Injured, Critical)
- ✅ **Row Selection** - Select individual or all rows with checkbox
- 📤 **Submit Action** - Log selected ninja IDs to console
- 🧪 **Test Coverage** - Jest + React Testing Library

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI + Radix UI
- **Table**: TanStack Table
- **Data Fetching**: React Query
- **State Management**: React Context
- **Testing**: Jest + React Testing Library

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ninjas-nov23
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Local Development (Option 1: JSON Server)

1. Start the JSON Server:

```bash
json-server --watch ninjas-database.json --port 3000
```


3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Local Development (Option 2: Vercel API Routes)

1. Install Vercel CLI (if not already installed):

```bash
npm install -g vercel
```

2. Start the Vercel development server:

```bash
vercel dev
```

This runs both the frontend and API routes locally.

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run vercel-build` - Build for Vercel deployment

## Project Structure

```
src/
├── api/              # API client functions and types
├── components/       # React components
│   ├── ninjas/      # Ninja-specific components
│   └── ui/          # Shadcn UI components
├── context/         # React Context providers
├── test/            # Test configuration
├── App.tsx          # Main application component
└── main.tsx         # Application entry point

api/
└── ninjas.ts         # Vercel serverless API endpoint
```

## Data Model

```typescript
interface Ninja {
  id: string;
  name: string;
  location: string;
  health: 'Healthy' | 'Injured' | 'Critical';
  power: number;
}
```

## Usage

1. **Search**: Type in the search box to filter across all fields
2. **Sort**: Click the Power column header to sort ascending/descending
3. **Filter**: Click the filter icon in the Health column to select specific health statuses
4. **Select**: Use checkboxes to select rows
5. **Submit**: Click "Submit Selected" to log selected IDs to the console
6. **Navigate**: Use Previous/Next buttons for pagination

## License

MIT
