import { z } from 'zod';
import { insertSessionSchema, insertMessageSchema, sessions, messages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  sessions: {
    create: {
      method: 'POST' as const,
      path: '/api/sessions' as const,
      input: z.object({ id: z.string() }),
      responses: {
        200: z.custom<typeof sessions.$inferSelect>(),
      }
    },
    get: {
      method: 'GET' as const,
      path: '/api/sessions/:id' as const,
      responses: {
        200: z.custom<typeof sessions.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/sessions/:id' as const,
      input: insertSessionSchema.partial(),
      responses: {
        200: z.custom<typeof sessions.$inferSelect>(),
      }
    }
  },
  ai: {
    quiz: {
      method: 'POST' as const,
      path: '/api/ai/quiz' as const,
      input: z.object({
        interests: z.array(z.string()),
        skills: z.array(z.string()),
        workStyle: z.string(),
        education: z.string(),
      }),
      responses: {
        200: z.array(z.object({
          title: z.string(),
          description: z.string(),
          demandLevel: z.string(),
          salaryRange: z.string(),
          requiredSkills: z.array(z.string()),
        }))
      }
    },
    skillGap: {
      method: 'POST' as const,
      path: '/api/ai/skill-gap' as const,
      input: z.object({
        targetCareer: z.string(),
        currentSkills: z.array(z.string()),
      }),
      responses: {
        200: z.object({
          missingSkills: z.array(z.string()),
          improvementSuggestions: z.array(z.string()),
        })
      }
    },
    roadmap: {
      method: 'POST' as const,
      path: '/api/ai/roadmap' as const,
      input: z.object({
        targetCareer: z.string(),
        missingSkills: z.array(z.string()),
      }),
      responses: {
        200: z.object({
          steps: z.array(z.object({
            title: z.string(),
            description: z.string(),
            estimatedTime: z.string(),
          }))
        })
      }
    },
    avatar: {
      method: 'POST' as const,
      path: '/api/ai/avatar' as const,
      input: z.object({
        quizData: z.object({
          interests: z.array(z.string()),
          skills: z.array(z.string()),
          workStyle: z.string(),
          education: z.string(),
        }),
        selectedCareer: z.string(),
      }),
      responses: {
        200: z.object({
          profileDescription: z.string(),
          achievements: z.array(z.string()),
          impact: z.string(),
        })
      }
    },
    chat: {
      method: 'POST' as const,
      path: '/api/ai/chat' as const,
      input: z.object({
        sessionId: z.string(),
        message: z.string(),
      }),
      responses: {
        200: z.object({
          reply: z.string()
        })
      }
    },
    chatHistory: {
      method: 'GET' as const,
      path: '/api/sessions/:sessionId/chat' as const,
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>())
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}