// pages/api/webhook.js

import { generateReply } from '../../utils/gpt';
// Assume we have a function to send WhatsApp messages (adapt as needed)
import { sendWhatsappMessage } from '../../utils/whatsapp';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sender_info, received_text } = parseIncomingMessage(req.body);
    
    const replyText = await generateReply(received_text);
    await sendWhatsappMessage(sender_info, replyText);
    
    res.status(200).json({ message: 'Reply sent' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
