// utils/gpt.js
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

async function generateReply(message) {
  const gptResponse = await openai.Completion.create({
    engine: 'text-davinci-003',
    prompt: message,
    max_tokens: 150
  });

  return gptResponse.choices[0].text.trim();
}

module.exports = {
  generateReply
};
