const GROK_API_KEY = import.meta.env.VITE_GROK_KEY;

export const fetchGrokAnalysis = async (ticketText) => {
  // This is a template for when you're ready to go live
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "You are an IT Support AI. Analyze tickets and return JSON." },
        { role: "user", content: ticketText }
      ],
      model: "grok-beta"
    })
  });
  return response.json();
};