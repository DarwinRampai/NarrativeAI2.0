import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scripts = pgTable("scripts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  content: text("content").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  settings: jsonb("settings"),
});

// New tables for feature recommendations
export const userInteractions = pgTable("user_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  featurePath: text("feature_path").notNull(),
  interactionType: text("interaction_type").notNull(), // 'view', 'click', 'complete'
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const featureRecommendations = pgTable("feature_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  feature: text("feature").notNull(),
  score: integer("score").notNull(),
  reasoning: text("reasoning"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Existing schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
});

export const insertScriptSchema = createInsertSchema(scripts).pick({
  content: true,
  metadata: true,
});

// New schemas for interactions and recommendations
export const insertUserInteractionSchema = createInsertSchema(userInteractions).pick({
  featurePath: true,
  interactionType: true,
  metadata: true,
});

export const insertFeatureRecommendationSchema = createInsertSchema(featureRecommendations).pick({
  feature: true,
  score: true,
  reasoning: true,
  metadata: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Script = typeof scripts.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type UserInteraction = typeof userInteractions.$inferSelect;
export type FeatureRecommendation = typeof featureRecommendations.$inferSelect;