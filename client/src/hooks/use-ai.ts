import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.ai.quiz.input>) => {
      const res = await fetch(api.ai.quiz.path, {
        method: api.ai.quiz.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit quiz");
      return api.ai.quiz.responses[200].parse(await res.json());
    },
  });
}

export function useAnalyzeSkillGap() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.ai.skillGap.input>) => {
      const res = await fetch(api.ai.skillGap.path, {
        method: api.ai.skillGap.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to analyze skill gap");
      return api.ai.skillGap.responses[200].parse(await res.json());
    },
  });
}

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.ai.roadmap.input>) => {
      const res = await fetch(api.ai.roadmap.path, {
        method: api.ai.roadmap.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to generate roadmap");
      return api.ai.roadmap.responses[200].parse(await res.json());
    },
  });
}

export function useGenerateAvatar() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.ai.avatar.input>) => {
      const res = await fetch(api.ai.avatar.path, {
        method: api.ai.avatar.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to generate avatar");
      return api.ai.avatar.responses[200].parse(await res.json());
    },
  });
}

export function useChatHistory(sessionId: string) {
  return useQuery({
    queryKey: [api.ai.chatHistory.path, sessionId],
    queryFn: async () => {
      const url = buildUrl(api.ai.chatHistory.path, { sessionId });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch chat history");
      return api.ai.chatHistory.responses[200].parse(await res.json());
    },
    enabled: !!sessionId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.ai.chat.input>) => {
      const res = await fetch(api.ai.chat.path, {
        method: api.ai.chat.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to send message");
      return api.ai.chat.responses[200].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.ai.chatHistory.path, variables.sessionId] });
    },
  });
}
