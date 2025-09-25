'use server';

/**
 * @fileOverview AI-powered personalized product recommendations based on user behavior.
 *
 * - getPersonalizedRecommendations - A function that returns personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user to get recommendations for.'),
  browsingHistory: z.array(z.string()).describe('The user\'s browsing history (list of product IDs).'),
  purchaseHistory: z.array(z.string()).describe('The user\'s purchase history (list of product IDs).'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of product IDs recommended for the user.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {
    schema: PersonalizedRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedRecommendationsOutputSchema,
  },
  prompt: `You are an expert recommendation engine. Given a user's browsing history and purchase history, you will recommend a list of products that the user might be interested in.

User ID: {{{userId}}}
Browsing History: {{#if browsingHistory}}{{#each browsingHistory}}- {{{this}}}{{/each}}{{else}}No browsing history{{/if}}
Purchase History: {{#if purchaseHistory}}{{#each purchaseHistory}}- {{{this}}}{{/each}}{{else}}No purchase history{{/if}}

Based on this information, recommend a list of product IDs that the user might be interested in.  Do not explain your reasoning.

Here is the output schema in JSON:
${JSON.stringify(PersonalizedRecommendationsOutputSchema.shape, null, 2)}`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
