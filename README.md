# 🚀 Zorvyn
🌐 Live Demo: https://nishaad-zorvyn-dd5s.vercel.app/
Zorvyn is a modern, high-performance financial analytics and management dashboard. Designed with a sleek user interface and robust architecture, it provides users with real-time insights into their financial health, transaction history, and income trends. It features role-based access control, dark mode support, and seamless data export capabilities.

## 📖 Description
Managing personal or enterprise finances requires clear data visualization and intuitive controls. Zorvyn solves this by offering a centralized dashboard that aggregates complex financial data into easily digestible charts, quick stats, and categorized insights. Built with a React/TypeScript frontend and a Node.js backend, it prioritizes speed, type safety, and a premium user experience.

Key Features:

📊 Comprehensive Dashboard: View total balances, income charts, and category overviews at a glance.

💸 Transaction Management: Track, filter, and review recent activities and detailed transaction histories.

🔐 Role-Based Access: Built-in role management ensuring secure and tailored experiences for different user types.

🌙 Dark Mode Ready: Fully integrated dark and light themes for optimal viewing in any environment.

📥 Data Export: Easily export financial data and reports for external use.

⚡ Lightning Fast: Powered by Vite and React for instantaneous load times and smooth interactions.

## 🧭 Table of Contents
🛠️ Tech Stack

⚙️ Installation

▶️ Usage

💡 Usage Examples

📂 Project Structure

🚧 Features

🔮 Future Improvements

🤝 Contributing

👤 Author

## 🛠️ Tech Stack
Frontend:

React 18 (via Vite)

TypeScript (Strict type checking)

Tailwind CSS (Utility-first styling & Dark Mode)

Zustand / Context (Global state management for roles, navigation, and transactions)

Backend:

Node.js * TypeScript ---

## ⚙️ Installation
1. Clone the repository

```bash
git clone https://github.com/nishaaddhabale/nishaad-zorvyn.git
cd nishaad-zorvyn
```

2. Backend Setup
Navigate to the backend directory, install dependencies, and build the TypeScript code.

```bash
cd Backend
npm install
npm run build
```

3. Frontend Setup
Navigate to the frontend directory and install dependencies.

```bash
cd ../Frontend
npm install
```

## ▶️ Usage

Start the Backend Server

```bash
cd Backend
npm start
```

(Or use npm run dev if configured for local development).

Start the Frontend Application

```bash
cd Frontend
npm run dev
```

The application will automatically open in your browser at http://localhost:5173.

## 💡 Usage Examples

Tracking Income & Expenses

Log into the Zorvyn dashboard.

The Overview section immediately displays your TotalBalance and QuickStats.

Scroll to the IncomeChart to visually analyze your cash flow over the selected period.

Check the RecentActivities feed for the latest inbound and outbound transactions.

Exporting Financial Reports

Navigate to the Transactions view.

Filter your transactions by date or category using the intuitive UI.

Click the Export button to utilize the built-in export.ts utility, downloading your data seamlessly in standard formats (e.g., CSV).

Toggling Dark Mode

Click the theme toggle icon in the TopNav. The application seamlessly transitions between light and dark themes without reloading, leveraging Tailwind's dark mode utilities and the useDarkMode custom hook.

## 📂 Project Structure

```plaintext
├── Backend/
│   ├── package.json
│   ├── tsconfig.json          # Backend TypeScript configuration
│   └── (Server logic, routes, and models)
├── Frontend/
│   ├── public/                # Static assets (favicons, SVG icons)
│   ├── src/
│   │   ├── assets/            # Images (hero.png, etc.)
│   │   ├── components/
│   │   │   ├── dashboard/     # Core widgets (IncomeChart, Insights, Overview, Transactions)
│   │   │   ├── layout/        # Structural components (Sidebar, TopNav, Layout)
│   │   │   └── ui/            # Reusable elements (StatCard, CategoryOverview)
│   │   ├── hooks/             # Custom state & logic hooks (useDarkMode, useRoleStore)
│   │   ├── utils/             # Helper functions (export.ts, logic.ts)
│   │   ├── App.tsx            # Root application component
│   │   ├── index.css          # Global Tailwind styles
│   │   └── main.tsx           # React entry point
│   ├── tailwind.config.js     # Tailwind design system configuration
│   ├── tsconfig.json          # Frontend TypeScript configuration
│   └── vite.config.ts         # Vite bundler configuration
└── README.md
```

## 🚧 Features

[x] Comprehensive Analytics Dashboard.

[x] Custom React Hooks for Global State Management (useNavigationStore, useTransactionStore).

[x] Advanced UI Components (CardsSection, Insights, IncomeChart).

[x] System-preference aware Dark Mode toggle.

[x] Export utilities for financial data extraction.

[x] Responsive layout with dynamic Sidebar and Top Navigation.

## 🔮 Future Improvements

Bank API Integration: Connect securely with external bank accounts via Plaid or similar aggregators for automated transaction syncing.

Budgeting Tools: Allow users to set monthly budget limits per category and receive alerts when nearing thresholds.

AI Financial Insights: Integrate machine learning to analyze spending habits and provide personalized tips for saving money.

Multi-Currency Support: Real-time currency conversion for tracking international investments and expenditures.

## 🤝 Contributing

Contributions make the developer community an amazing place to learn and create.

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

## 👤 Author

Nishaad Dhabale

GitHub: @nishaaddhabale

Other Projects: [FreeFlow, Mindstash, SwiftPay, Grampanchayat, BlueCarbon, VectorShift]
