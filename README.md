# React To-Do — Kanban Task Board

A task manager built with React that goes beyond a basic to-do list — tasks are organized into a drag-and-drop Kanban board with categories, priorities, and due dates, and everything persists locally in the browser.

[Live Demo](#) · [Report a Bug](../../issues)

> Replace the live demo link above once deployed (e.g. via Vercel or Netlify), and swap this line for a screenshot/GIF of the board in action — it's the first thing recruiters look at.

## Features

- **Kanban-style board** — tasks flow between *Pending* and *Completed* columns
- **Drag-and-drop** — move tasks between columns using the native HTML5 Drag and Drop API
- **Rich task metadata** — each task supports a category (Work / Personal / Shopping / Others), a priority level (Low / Medium / High), and a due date
- **Color-coded badges** — categories and priorities are visually tagged for quick scanning
- **Persistent storage** — tasks are saved to `localStorage` and automatically restored on page reload, so nothing is lost on refresh
- **Live counts** — each column header shows a real-time count of tasks in that state
- **One-click delete** — remove tasks instantly from either column

## Tech Stack

- **React 18** (functional components, hooks: `useState`, `useEffect`)
- **Vite** — dev server and build tooling
- **CSS3** — custom styling, no UI framework
- **Browser `localStorage` API** — client-side persistence
- **HTML5 Drag and Drop API** — native drag interactions (no external DnD library)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/JaYDen-sketch/React-ToDO.git
cd React-ToDO

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173` (or the port Vite assigns).

### Build for production

```bash
npm run build
```

## How It Works

- Adding a task: fill in the task text, pick a category and priority, optionally set a due date, and submit — the task lands in the **Pending** column.
- Moving a task: drag any task card and drop it into the **Pending** or **Completed** column to update its status.
- Deleting a task: click the ✕ icon on a task card to remove it permanently.
- Tasks and their state are synced to `localStorage` on every change, so your board survives a page refresh or browser restart.

## Possible Improvements

- [ ] Edit existing tasks instead of only add/delete
- [ ] Filter/search by category or priority
- [ ] Sort by due date
- [ ] Deploy a live demo and link it above

## License

This project is open source and available for learning purposes.
