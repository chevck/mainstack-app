# MainStack Revenue App

A modern, responsive revenue management dashboard built with React, TypeScript, and Vite. This application provides a comprehensive interface for viewing wallet balances, transaction history, and revenue analytics.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Architecture](#architecture)
- [Components](#components)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Responsive Design](#responsive-design)

## 🎯 Overview

The MainStack Revenue App is a financial dashboard that allows users to:
- View wallet balances (available, ledger, total payout, total revenue, pending payout)
- Analyze revenue trends through interactive charts
- Browse and filter transaction history
- Monitor account activity with real-time data updates

## ✨ Features

### Core Functionality
- **Dashboard Overview**: Real-time display of wallet balances and financial metrics
- **Revenue Chart**: Interactive line chart showing revenue trends over time
- **Transaction Management**: Comprehensive transaction list with filtering and export capabilities
- **User Profile**: User information display with personalized avatar
- **Loading States**: Elegant loading overlay during data fetching
- **Error Handling**: Graceful error handling with user-friendly notifications

### User Interface
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations
- **Navigation**: Intuitive sidebar navigation with tooltips
- **Mobile Menu**: Bottom navigation bar optimized for mobile devices
- **Interactive Elements**: Hover effects, tooltips, and smooth transitions

## 🛠 Tech Stack

### Core
- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server

### UI Libraries
- **Chakra UI 3.28.0** - Component library and theming
- **Recharts 3.3.0** - Chart library for data visualization
- **Lucide React** - Icon library
- **Sonner 2.0.7** - Toast notifications

### Development Tools
- **Jest 29.7.0** - Testing framework
- **React Testing Library 16.0.0** - Component testing utilities
- **ESLint 9.36.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
src/
├── assets/                  # Static assets (images, fonts, icons)
│   ├── fonts/              # Degular Display font family
│   └── *.svg, *.png        # Image assets
├── components/             # React components
│   ├── drawers/           # Drawer/modal components
│   │   └── FilterTransactions.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx     # Top navigation header
│   │   └── Sidebar.tsx    # Side navigation menu
│   ├── ui/                # Reusable UI components
│   │   ├── color-mode.tsx
│   │   ├── provider.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   ├── GraphSection.tsx   # Revenue chart and balances
│   └── Transactions.tsx   # Transaction list component
├── constants/             # Application constants
│   └── config.ts         # API endpoint configuration
├── types/                # TypeScript type definitions
│   ├── transaction.types.ts
│   ├── user.types.ts
│   └── wallet.types.ts
├── utils/                # Utility functions
│   └── index.ts         # formatMoney, formatDate helpers
├── test/                 # Test files
│   ├── components/      # Component tests
│   ├── utils/          # Utility function tests
│   ├── setup.ts        # Test setup and polyfills
│   └── test-utils.tsx  # Testing utilities
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── styles.css           # Global styles
├── responsive.css       # Responsive styles
└── vite-env.d.ts       # Vite type declarations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mainstack-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive test coverage.

### Test Structure
- **Component Tests**: Test individual component rendering and behavior
- **Utility Tests**: Test helper functions like `formatMoney` and `formatDate`
- **Integration Tests**: Test component interactions and data flow

### Running Tests
```bash
# Run all tests
npm test

# Run tests for a specific file
npm test -- App.test.tsx

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
The test suite covers:
- ✅ App component structure and data fetching
- ✅ Header component rendering
- ✅ Sidebar navigation
- ✅ GraphSection with wallet balances
- ✅ Transactions component
- ✅ Utility functions (formatting)

## 🏗 Architecture

### Component Hierarchy
```
App
├── Header (user info, navigation)
├── Content
    ├── Sidebar (main navigation menu)
    └── MainContent
        ├── GraphSection (charts and balances)
        └── Transactions (transaction list)
```

### Data Flow
1. App component fetches data from API on mount
2. Data is fetched in parallel using `Promise.all`
3. State is updated with fetched data
4. Data flows down to child components as props
5. Components render based on received props

### State Management
- Local component state using React hooks (`useState`)
- Loading state management
- Error handling with try-catch blocks
- Toast notifications for user feedback

## 🧩 Components

### Header
- Displays MainStack logo
- Navigation menu (Home, Analytics, Revenue, CRM, Apps)
- User profile with avatar (initials)
- Notification and messaging icons
- Responsive design with centered layout on mobile

### Sidebar
- Vertical navigation menu on desktop
- Bottom navigation bar on mobile
- Navigation items with icons:
  - Link in Bio
  - Store
  - Media Kit
  - Invoicing
- Tooltips on hover showing item names

### GraphSection
- **Available Balance**: Large display of current wallet balance
- **Revenue Chart**: Interactive line chart showing revenue trends
- **Balance Cards**: Display of:
  - Ledger Balance
  - Total Payout
  - Total Revenue
  - Pending Payout
- **Withdraw Button**: Action button for withdrawals

### Transactions
- Transaction list with filtering capabilities
- Transaction details:
  - Amount and date
  - Transaction type (deposit/withdrawal)
  - Status indicators
  - User/product metadata
- Filter drawer for advanced filtering
- Export functionality
- Empty state handling

## 🔌 API Integration

### Base URL
```
https://fe-task-api.mainstack.io
```

### Endpoints
- `GET /user` - Fetch user information
- `GET /transactions` - Fetch transaction list
- `GET /wallet` - Fetch wallet balance data

### Data Types

#### User
```typescript
interface User {
  first_name: string;
  last_name: string;
  email: string;
}
```

#### Transaction
```typescript
interface Transaction {
  amount: number;
  date: string;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: string;
}
```

#### WalletBalance
```typescript
interface WalletBalance {
  balance: number;
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
}
```

## 🎨 Styling

### Global Styles
- **Font**: Degular Display (multiple weights)
- **Color Scheme**: Modern, professional palette
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and loading spinners

### Key Styles
- **Loading Overlay**: Full-screen overlay with spinner
- **Rounded Corners**: Pill-shaped buttons and containers
- **Shadows**: Subtle box shadows for depth
- **Typography**: Clear hierarchy with appropriate font sizes

## 📱 Responsive Design

### Breakpoints
- **Desktop**: Default layout with sidebar navigation
- **Tablet/Mobile** (≤768px): 
  - Stacked header layout
  - Bottom navigation menu
  - Optimized spacing and typography

### Mobile Optimizations
- Bottom navigation bar replaces sidebar
- Centered header content
- Adjusted transaction list layout
- Touch-friendly button sizes
- Reduced padding for mobile screens

## 🔧 Configuration

### Environment Setup
The app uses a single API endpoint configured in `src/constants/config.ts`:
```typescript
export const ENDPOINT_URL = "https://fe-task-api.mainstack.io";
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured
- JSX transform enabled
- ES2022 target

## 📝 Utility Functions

### formatMoney
Formats numbers as USD currency strings:
```typescript
formatMoney(50000) // "USD 50,000"
formatMoney(1000.5) // "USD 1,000.5"
```

### formatDate
Formats ISO date strings to readable format:
```typescript
formatDate("2024-01-15T00:00:00.000Z") // "Jan 15, 2024"
```

## 🐛 Error Handling

- Network errors are caught and displayed via toast notifications
- Loading states prevent interaction during data fetching
- Graceful degradation when data is unavailable
- User-friendly error messages

## 🔒 Type Safety

The project uses TypeScript for:
- Component prop validation
- API response typing
- Utility function type safety
- Compile-time error detection

## 📚 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions

### Component Structure
- Extract reusable components
- Keep components focused and single-purpose
- Use proper TypeScript types
- Implement error boundaries where appropriate

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write or update tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 👥 Team

Built with ❤️ by the MainStack team
