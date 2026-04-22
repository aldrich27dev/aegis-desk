export const analyzeTicket = (text) => {
  const content = text.toLowerCase();
  
  let category = "Software";
  if (content.includes("vpn") || content.includes("wifi") || content.includes("internet")) category = "Network";
  if (content.includes("laptop") || content.includes("monitor") || content.includes("keyboard")) category = "Hardware";

  let priority = "Low";
  if (content.includes("urgent") || content.includes("broken") || content.includes("down")) priority = "High";

  return { category, priority, department: "IT Support" };
};

export const generateResponse = (ticket) => {
  const responses = {
    Network: `I've analyzed your connection logs for ${ticket.id}. It looks like a protocol mismatch. Try resetting your DNS first.`,
    Hardware: `Replacement hardware request for ${ticket.id} has been logged. Our technician will contact you for pickup.`,
    Software: `Please try clearing your cache and restarting the application. If the issue persists, send a screenshot.`
  };
  return responses[ticket.category] || "How can I help you today?";
};