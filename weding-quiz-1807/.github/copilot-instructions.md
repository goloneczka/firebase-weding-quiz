# Copilot Instructions for `weding-quiz-1807`

## Project Overview
This is a minimal React app scaffolded with Vite. It uses modern React (v19+) and Vite for fast development and builds. The codebase is organized for simplicity and rapid prototyping.

## Key Files & Structure
- `src/`: Main source code
  - `App.jsx`: Main React component (entry point)
  - `main.jsx`: Mounts React app to DOM
  - `assets/`: Static assets (SVGs)
  - `App.css`, `index.css`: Stylesheets
- `public/`: Static files for Vite
- `index.html`: HTML entry point
- `vite.config.js`: Vite configuration (uses `@vitejs/plugin-react`)
- `eslint.config.js`: ESLint config (see below)

## Developer Workflows
- **Start Dev Server:** `npm run dev` (hot reload, Vite)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint with React Hooks and Refresh plugins)

## ESLint Conventions
- Uses recommended rules for JS, React Hooks, and React Refresh.
- Ignores `dist` folder globally.
- Custom rule: Unused variables are errors unless their names start with a capital letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## React Patterns
- Components are function components using hooks.
- App entry is in `App.jsx`, mounted in `main.jsx`.
- Static assets are imported from `src/assets` or referenced from `public`.

## Integration Points
- No backend/API integration in this template.
- External dependencies: React, ReactDOM, Vite, ESLint plugins.

## Example: Adding a Component
1. Create a new file in `src/` (e.g., `Quiz.jsx`).
2. Import and use it in `App.jsx`.
3. Use hooks for state and effects.

## Example: Importing an Asset
```jsx
import logo from './assets/react.svg';
<img src={logo} alt="React Logo" />
```

## Notes
- TypeScript is not enabled; see Vite docs to migrate.
- No test setup by default.
- Follow the file/folder conventions for new code.

---
For questions about project structure or conventions, see `README.md` or ask for clarification.
