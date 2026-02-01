import { InferenceClient } from '@huggingface/inference';
import OpenAI from 'openai';
import summarizePrompt from './prompts/summarize-reviews.txt';

export const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
  instructions?: string;
  previousResponseId?: string;
};

type ChatResponse = {
  id: string;
  text: string;
};

const generateText = async ({
  model = 'gpt-4.1',
  prompt,
  temperature = 0.2,
  maxTokens = 300,
  instructions,
  previousResponseId,
}: GenerateTextOptions): Promise<ChatResponse> => {
  const response = await openAiClient.responses.create({
    model,
    input: prompt,
    temperature,
    instructions,
    previous_response_id: previousResponseId,
    max_output_tokens: maxTokens,
  });

  return {
    id: response.id,
    text: response.output_text,
  };
};

const summarizeReviews = async (reviews: string) => {
  const chatCompletion = await inferenceClient.chatCompletion({
    model: 'meta-llama/Llama-3.1-8B-Instruct:sambanova',
    messages: [
      {
        role: 'system',
        content:
          ' Summarize the following reviews into a short, \n  concise paragraph highlighting the main points, \n  both positive and negative:',
      },
      {
        role: 'user',
        content: reviews,
      },
    ],
  });

  return chatCompletion.choices[0]?.message.content || '';
};

export const llmClient = {
  generateText,
  summarizeReviews,
};
