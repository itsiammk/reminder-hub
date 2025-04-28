import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Event } from '@/lib/models/event';
import { v4 as uuidv4 } from 'uuid';
import { sendSMS, sendWhatsApp } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, dateTime, email, phone, whatsapp } = body;
    console.log('Create Event Input:', { title, dateTime, email, phone, whatsapp });

    // Validate required fields
    if (!title || !dateTime) {
      console.error('Validation Error: Missing title or dateTime');
      return NextResponse.json({ error: 'Title and dateTime are required' }, { status: 400 });
    }

    // MongoDB insert
    console.log('Connecting to MongoDB...');
    const db = await getDb();
    const shareLink = `/events/${uuidv4()}`;
    const event: Event = {
      title,
      dateTime,
      creator: { email, phone, whatsapp },
      participants: [],
      shareLink,
    };
    console.log('Inserting event:', event);
    await db.collection('events').insertOne(event);
    console.log('Event inserted successfully');

    // Send notifications to creator
    const message = `You joined "${title}" on ${new Date(dateTime).toLocaleString()}. You'll be reminded 12 hours before.`;

    // Twilio SMS
    if (phone) {
      console.log('Sending SMS to:', phone);
      try {
        await sendSMS(phone, message);
        console.log('SMS sent successfully');
      } catch (smsError) {
        console.error('SMS Error:', smsError);
      }
    }

    // Twilio WhatsApp
    if (whatsapp) {
      console.log('Sending WhatsApp to:', whatsapp);
      try {
        await sendWhatsApp(whatsapp, message);
        console.log('WhatsApp sent successfully');
      } catch (whatsappError) {
        console.error('WhatsApp Error:', whatsappError);
      }
    }

    return NextResponse.json({ shareLink: `${process.env.NEXT_PUBLIC_VERCEL_URL}${shareLink}` });
  } catch (error: any) {
    console.error('Create Event Error:', error);
    return NextResponse.json({ error: 'Failed to create event', details: error.message }, { status: 500 });
  }
}