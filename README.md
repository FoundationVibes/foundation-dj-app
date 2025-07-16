# Project Vaca

All-in-one DJ business app for multiple entertainment companies.  
Built with Next.js, Firebase, and React.

---

## 🌟 What is Project Vaca?

Project Vaca is a DJ company management app. It helps entertainment companies like **A-Z 3ntertainment Ohio** and **OK 3ntertainment** run their business—all in one place!

- Each company can have its own users and branding.
- User roles include: Admin, Manager, Planner, DJ, Client, and Guest.
- Everyone gets a dashboard based on their job.
- Super easy login and switching between companies.
- Focused on speed, security, and making life easier for DJs & event planners.

---

## 🚀 How do I start the app?

1. **Clone or download** this repo to your computer.
2. **Open** the folder in VS Code or your favorite editor.
3. **Install everything** by typing in your terminal:

    ```
    npm install
    ```

4. **Copy** `.env.example` to `.env.local` and add your Firebase settings.
5. **Run the app** by typing:

    ```
    npm run dev
    ```

6. **Open** your browser and go to [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

You need a `.env.local` file with your Firebase keys.  
Use `.env.example` as a guide!

---

## 🗂️ Project Structure

- `/app` — Main app code (Next.js 15)
- `/components` — Reusable parts like buttons, forms, etc.
- `/firebase` — Firebase setup and helpers
- `/lib` — Utility functions
- `/public` — Images and static files

---

## 👤 Who’s working on this?

- **Anthony Hunter** (DJ Swiss) — Owner & Lead Dev
- **Raven** — Co-owner & Project Manager
  

---

---

## 🗺️ Git Workflow (How We Work)

1. Make a new branch for your feature or bug fix. (Example: `feature/add-login`)
2. Do your work and push your changes.
3. Open a Pull Request into the `dev` branch.
4. Test and review changes in `dev`.
5. When everything in `dev` works, open a Pull Request into `main`.
6. Merge to `main` only when code is tested and ready for production.


---

## 📝 Branch Rules

- `main`: Always stable, deployable code
- `dev`: All new features and fixes get merged here first
- Make a new branch for every feature or bugfix (like `feature/add-login`)
- Never push directly to `main` — always use a Pull Request and get it reviewed

---

## 📋 License

MIT — Free to use, change, and share!

---

> Need more info? Ask Anthony or Queen, or check our docs folder (coming soon).
