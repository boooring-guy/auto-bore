import { inngest } from "./client";
import { EVENTS } from "./events";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: EVENTS.TEST_HELLO_WORLD },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const createWorkflow = inngest.createFunction(
  { id: "create-workflow" },
  { event: EVENTS.CREATE_WORKFLOW },
  async ({ event, step }) => {
    //  steps _ fetch video, transcribe video, generate workflow, save workflow
    await step.run("fetch-video", async () => {
      new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: `Video fetched successfully!` };
    });
    await step.run("transcribe-video", async () => {
      new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: `Video transcribed successfully!` };
    });
    await step.run("generate-workflow", async () => {
      return { message: `Workflow created successfully!` };
    });
    await step.run("save-workflow", async () => {
      new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: `Workflow saved successfully!` };
    });
    return { message: `Workflow created successfully!` };
  }
);
