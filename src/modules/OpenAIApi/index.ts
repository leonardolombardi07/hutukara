import OpenAI from "openai";

const OpenAIApi = new OpenAI({
  apiKey: "TODO: ADD API KEY HERE",

  // TODO: when we have an actual api key, we should move this to a route handler or something like this
  dangerouslyAllowBrowser: true,
});

export * from "openai";

export default OpenAIApi;
