# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

firebase emulators:start, npm run dev

Ruch lokalny w sieci IP:

1. w package.json jest "vite --host=0.0.0.0"
2. w firebase-config.js jest connectFunctionsEmulator(getFunctions(app), "192.168.18.7", 5001);
3. w firebase.json w root jest "emulators": {
   "functions": {
   "host": "0.0.0.0",
   "port": 5001
   }
   },

firebase deploy --only functions, npm run build, firebase deploy --only hosting
