'use server';

/**
 * @fileOverview Implements AI-enhanced search functionality to improve search accuracy.
 *
 * - aiSearchImprovement - An exported function that calls the flow.
 * - AiSearchImprovementInput - The input type for the aiSearchImprovement function.
 * - AiSearchImprovementOutput - The return type for the aiSearchImprovement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSearchImprovementInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type AiSearchImprovementInput = z.infer<
  typeof AiSearchImprovementInputSchema
>;

const AiSearchImprovementOutputSchema = z.object({
  improvedQuery: z
    .string()
    .describe(
      'An improved version of the query, correcting spelling errors and clarifying vague terms.'
    ),
});
export type AiSearchImprovementOutput = z.infer<
  typeof AiSearchImprovementOutputSchema
>;

export async function aiSearchImprovement(
  input: AiSearchImprovementInput
): Promise<AiSearchImprovementOutput> {
  return aiSearchImprovementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSearchImprovementPrompt',
  input: {schema: AiSearchImprovementInputSchema},
  output: {schema: AiSearchImprovementOutputSchema},
  prompt: `You are an AI assistant specializing in improving search queries for an e-commerce marketplace.

The goal is to refine user queries to overcome misspellings and vague language, thereby enhancing the accuracy of search results. Maintain the original intent of the user's query.

Original Query: {{{query}}}

Improved Query:`,
});

const aiSearchImprovementFlow = ai.defineFlow(
  {
    name: 'aiSearchImprovementFlow',
    inputSchema: AiSearchImprovementInputSchema,
    outputSchema: AiSearchImprovementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
