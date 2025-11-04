import { inngest } from "./client";
import { EVENTS } from "./events";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";
import { sentryLog } from "@/lib/utils";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const executeAi = inngest.createFunction(
  {
    id: "execute-ai",
    retries: 1, // Todo: change to 3 in production
  },
  {
    event: EVENTS.EXECUTE_AI,
  },
  async ({ event, step }) => {
    //step: 1  wrap the generateText function in a step
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );
    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4o-mini"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-5-haiku-latest"),
        system:
          "You are a helpful assistant that can answer questions and help with tasks.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return {
      gemini: geminiSteps,
      openai: openaiSteps,
      anthropic: anthropicSteps,
    };
  }
);
