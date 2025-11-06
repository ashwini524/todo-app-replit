import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tasks", async (_req, res) => {
    try {
      const tasks = await storage.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const result = insertTaskSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid task data", details: result.error });
      }

      if (!result.data.text || !result.data.text.trim()) {
        return res.status(400).json({ error: "Task text cannot be empty" });
      }

      const task = await storage.createTask(result.data);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = insertTaskSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid task data", details: result.error });
      }

      const task = await storage.updateTask(id, result.data);
      
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTask(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
