import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSMS(to: string, body: string) {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  } catch (error) {
    console.error('SMS Error:', error);
    throw error;
  }
}

export async function sendWhatsApp(to: string, body: string) {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
    });
  } catch (error) {
    console.error('WhatsApp Error:', error);
    throw error;
  }
}