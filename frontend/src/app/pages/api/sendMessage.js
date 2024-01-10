// pages/api/sendMessage.js
import Client from "twilio";

export default async function handler(req, res) {
  console.log("send message")
  if (req.method === 'POST') {
    try {
      const {API_KEY} = process.env

      const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
      // const client = new Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      const message = await client.messages.create({
        from: 'whatsapp:+14155238886',
        body: 'Hola, Luis Morla.',
        to: 'whatsapp:+593992366527'
      });

      res.status(200).json({ sid: message.sid });
    } catch (error) {
      console.error('Sending message error:', error);
      res.status(500).send('An error occurred while sending the message.');
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export function sendMessage() {



    fetch('http://localhost:4000/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: 'JSON.stringify(msg)'
    })
    .then(res => console.log(res))
    .then(data => {
        console.log(data);
    })

}