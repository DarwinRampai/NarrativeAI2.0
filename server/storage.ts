import { IStorage } from "./types";
import { User, Project, Script, Template, InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private scripts: Map<number, Script>;
  private templates: Map<number, Template>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.scripts = new Map();
    this.templates = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with a test user
    this.createUser({
      username: "test",
      password: "password123", // This will be hashed by auth.ts
      role: "user",
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    console.log("Getting user by ID:", id);
    const user = this.users.get(id);
    console.log("Found user:", user?.username);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    console.log("Getting user by username:", username);
    const user = Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
    console.log("Found user:", user?.username);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    console.log("Creating new user:", insertUser.username);
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      role: insertUser.role || "user",
    };
    this.users.set(id, user);
    console.log("User created successfully:", user.username);
    return user;
  }

  async getProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.userId === userId,
    );
  }

  async createProject(project: Omit<Project, "id" | "createdAt">): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { ...project, id, createdAt: new Date() };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getScripts(projectId: number): Promise<Script[]> {
    return Array.from(this.scripts.values()).filter(
      (script) => script.projectId === projectId,
    );
  }

  async createScript(script: Omit<Script, "id" | "createdAt">): Promise<Script> {
    const id = this.currentId++;
    const newScript: Script = { ...script, id, createdAt: new Date() };
    this.scripts.set(id, newScript);
    return newScript;
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }
}

export const storage = new MemStorage();