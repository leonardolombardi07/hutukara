import OpenAI from "openai";

const OpenAIApi = new OpenAI({
  apiKey: "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",

  // TODO: when we have an actual api key, we should move this to a route handler or something like this
  dangerouslyAllowBrowser: true,
});

export * from "openai";

export default OpenAIApi;
