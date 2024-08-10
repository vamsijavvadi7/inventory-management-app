'use server';
import { OpenAI } from "openai";

export async function suggestRecipe(inventory) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: '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',
  });    

  // Format the item list into a string
  const itemString = inventory.map(item => `${item.name} ${item.quantity}`).join(', ');

  // Create the prompt
  const prompt = `Tell me a detailed and magical recipe using the following items ${itemString} Use only these quantity measurements. return the content in a json format with title,ingredients({itemname-quantiy,itemname-quantity,itemname-quantity}), instructions. Just return the json format variable no additional text needed, without qoutes like a json varibale`;

  // Call the OpenAI API to get the recipe
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
    });

    // Extract and return the response content
    const recipe = response.choices[0].message.content;
   
    return recipe.trim(); // Trim any extraneous whitespace

  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "Sorry, there was an error generating the recipe.";
  }
}
