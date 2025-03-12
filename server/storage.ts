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
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
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
