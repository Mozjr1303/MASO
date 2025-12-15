# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (Railway)

This project is optimized for deployment on [Railway](https://railway.app).

### Steps to Deploy:

1.  **Push to GitHub**: Ensure your latest code is on GitHub.
2.  **Login to Railway**: Go to [Railway.app](https://railway.app) and login with GitHub.
3.  **New Project**: Click **New Project** -> **Deploy from GitHub repo**.
4.  **Select Repo**: Choose your `maso-awards` repository.
5.  **Add Database**:
    *   Once the project is created, right-click on the canvas or click **New**.
    *   Select **Database** -> **PostgreSQL**.
    *   Railway will automatically creating a Postgres database.
6.  **Link Database**:
    *   Railway usually auto-injects `DATABASE_URL` if you add the database *before* the web service, or you can link them.
    *   Click on your **Web Service** (the repo) -> **Variables**.
    *   Ensure `DATABASE_URL` is set (it typically references `{{Postgres.DATABASE_URL}}`).
7.  **Generate Domain**:
    *   Click on your **Web Service** -> **Settings**.
    *   Under **Networking**, click **Generate Domain** to get a public URL (e.g., `maso-awards-production.up.railway.app`).

**Note**: The app uses `npm install && npm run build` as the build command and `npm start` to run. Railway detects this automatically via `package.json` and `Procfile`.
