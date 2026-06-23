const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check — used by Kubernetes later
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Sample data — simulates a mini task manager
const tasks = [
  { id: 1, title: "Containeriser l'app", done: true },
  { id: 2, title: "Configurer CI/CD", done: false },
  { id: 3, title: "Déployer sur EKS", done: false },
  { id: 4, title: "Configurer le monitoring", done: false },
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH toggle task
app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.done = !task.done;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

