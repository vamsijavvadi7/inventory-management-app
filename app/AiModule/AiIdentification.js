'use server';
import { OpenAI } from "openai";

export async function identifyObject(imageUrl) {

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey:  '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',
  })
      // Call the OpenAI API to describe the image
      const responseimg = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "tell me the object in this image and just return object name nothing else needed?" },
              {
                type: "image_url",
                image_url: {
                  "url": imageUrl,
                },
              },
            ],
          },
        ],
      });
  
   
  const objectName = responseimg.choices[0].message.content;
  if(objectName=="I'm sorry, i can't identify the objects in this image."){
    alert("OOPs! Try with a Different Image I Couldn't guess the object in this image")
    return null;
  }
  
  return objectName.trim(); // Return the identified object name
}
