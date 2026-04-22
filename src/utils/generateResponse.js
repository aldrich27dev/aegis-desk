export const generateResponse = (ticket) => {
  const templates = {
    Network: `Hello ${ticket.user}, we've detected a possible routing issue in your region. Our network team is resetting the tunnel now. Please try reconnecting in 5 minutes.`,
    Hardware: `Hi ${ticket.user}, I've flagged this for Hardware Ops. Since this involves a ${ticket.priority} priority request, a technician will reach out for a replacement/repair schedule.`,
    DevOps: `Acknowledged. We are reviewing the logs for ${ticket.id}. SRE team has been paged.`,
    Software: `Hi ${ticket.user}, have you tried clearing your cache? If not, please provide the error logs so we can investigate the software bug further.`
  };

  return templates[ticket.category] || "How can I help you with this ticket?";
};