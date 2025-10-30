import OpenAI from 'openai';

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  const response = await client.responses.create({
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

export const llmClient = {
  generateText,
};
