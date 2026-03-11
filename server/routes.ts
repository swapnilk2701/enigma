import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { openai } from "./replit_integrations/audio/client";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.sessions.create.path, async (req, res) => {
    try {
      const input = api.sessions.create.input.parse(req.body);
      let session = await storage.getSession(input.id);
      if (!session) {
        session = await storage.createSession(input.id);
      }
      res.status(200).json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.sessions.get.path, async (req, res) => {
    const session = await storage.getSession(req.params.id);
    if (!session) return res.status(404).json({ message: "Not found" });
    res.json(session);
  });

  app.patch(api.sessions.update.path, async (req, res) => {
    try {
      const input = api.sessions.update.input.parse(req.body);
      const session = await storage.updateSession(req.params.id, input);
      res.json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post(api.ai.quiz.path, async (req, res) => {
    try {
      const input = api.ai.quiz.input.parse(req.body);
      const prompt = `Based on interests: ${input.interests.join(", ")}, skills: ${input.skills.join(", ")}, work style: ${input.workStyle}, and education: ${input.education}. Suggest 3 future careers expected to be in demand in 2035. Output ONLY a valid JSON array where each object has: title, description, demandLevel, salaryRange, requiredSkills (array of strings). Do not include markdown formatting or backticks.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });
      
      let content = response.choices[0].message.content;
      let data = JSON.parse(content || '{"careers": []}');
      res.json(data.careers || data);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.ai.skillGap.path, async (req, res) => {
    try {
      const input = api.ai.skillGap.input.parse(req.body);
      const prompt = `Target Career: ${input.targetCareer}. Current Skills: ${input.currentSkills.join(", ")}. Analyze the skill gap. Output ONLY a valid JSON object with: missingSkills (array of strings) and improvementSuggestions (array of strings). Do not include markdown formatting or backticks.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });
      
      let content = response.choices[0].message.content;
      res.json(JSON.parse(content || '{}'));

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.ai.roadmap.path, async (req, res) => {
    try {
      const input = api.ai.roadmap.input.parse(req.body);
      const prompt = `Target Career: ${input.targetCareer}. Missing Skills: ${input.missingSkills.join(", ")}. Create a learning roadmap. Output ONLY a valid JSON object with: steps (array of objects with title, description, estimatedTime). Do not include markdown formatting or backticks.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });
      
      let content = response.choices[0].message.content;
      res.json(JSON.parse(content || '{}'));

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.ai.avatar.path, async (req, res) => {
    try {
      const input = api.ai.avatar.input.parse(req.body);
      const prompt = `Create a futuristic profile for 2035 based on selected career: ${input.selectedCareer}. Output ONLY a valid JSON object with: profileDescription, achievements (array of strings), impact. Do not include markdown formatting or backticks.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });
      
      let content = response.choices[0].message.content;
      res.json(JSON.parse(content || '{}'));

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.ai.chatHistory.path, async (req, res) => {
    const history = await storage.getChatHistory(req.params.sessionId);
    res.json(history);
  });

  app.post(api.ai.chat.path, async (req, res) => {
    try {
      const input = api.ai.chat.input.parse(req.body);
      
      await storage.addMessage({
        sessionId: input.sessionId,
        role: 'user',
        content: input.message,
      });

      const history = await storage.getChatHistory(input.sessionId);
      const messagesContext = history.map(msg => ({ role: msg.role as 'user'|'assistant', content: msg.content }));
      
      messagesContext.unshift({ role: 'system', content: 'You are an AI Career Mentor from 2035 helping users navigate their future.'});
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messagesContext,
      });
      
      const reply = response.choices[0].message.content || 'I am sorry, I am having trouble processing that.';
      
      await storage.addMessage({
        sessionId: input.sessionId,
        role: 'assistant',
        content: reply,
      });

      res.json({ reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}