## Overview
The HMCTS Case Manager is a streamlined internal dashboard designed for legal professionals to register, track, and manage active court cases.

The application solves the problem of "data fragmentation" by providing a centralized Active Case Registry. It features a "Full-Screen" layout that prioritizes the case list while keeping registration tools within reach. The UI is built to be "responsive-first," meaning it works just as well on a courtroom tablet as it does on a dual-monitor desktop setup

## Tech Stack & Libraries
Frontend: React 18+ TypeScript

UI Framework: Mantine UI v7 (with PostCSS)

State Management: Redux Toolkit (RTK) – Managing the global case registry state.

Icons: Tabler Icons

Build Tool: Vite

## Installation Process
Follow these steps to set up your local development environment.

### 1. Prerequisites
Ensure you have Node.js (v18+) installed. You can check by running:

Bash
node -v
### 2. Clone the Repository
Bash
git clone https://github.com/chijideso/hmcts-dts-developer-challenge.git
cd hmcts-case-manager
3. Install Dependencies
This will install Mantine, Redux Toolkit, and all necessary styling plugins.

## Bash
npm install
4. Project Structure Overview
Before you start coding, here is where the main logic lives:

src/store/: Redux store configuration and caseSlice.js.

src/Features/Components/: Contains the CaseForm and CaseList (the table).

src/App.jsx: The main layout using Mantine's AppShell.

### 5. Start the Development Server
Bash
npm run dev
The app will be available at http://localhost:5173.

## Application Architecture
State Management (Redux)
The app uses a centralized Redux store to handle data flow. When a user adds or edits a case:

Dispatch: An action is dispatched (e.g., addCase or updateCase).

Reducer: The Redux slice updates the global items array.

Selector: The CaseList table automatically re-renders to show the new data.

Responsive Layout
We use a Fluid Flexbox strategy:

Desktop: The Form (400px) and Table (flexible) sit side-by-side.

Mobile: The layout automatically stacks vertically to ensure the table remains readable.

Modals: All "Edit" actions are handled via a centralized Mantine Modal to keep the interface clean.
## Common ScriptsCommandAction
npm run devStarts the local dev server with Hot Module Replacement.
npm run buildCompiles and minifies the app for production.
npm run previewLocally preview the production build.
