import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { sendSMS, sendWhatsApp } from '@/lib/twilio';
import { Event } from '@/lib/models/event';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const now = new Date();
    const twelveHoursBefore = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours from now

    // Find events within the next 12 hours (e.g., reminder at 2 AM for 2 PM event)
    const events = await db
      .collection('events')
      .find<Event>({
        dateTime: {
          $gte: now.toISOString(),
          $lte: twelveHoursBefore.toISOString(),
        },
      })
      .toArray();

    for (const event of events) {
      const message = `Reminder: ${event.title} is in 12 hours at ${new Date(event.dateTime).toLocaleString()}!`;

      // Creator notifications (SMS/WhatsApp)
      if (event.creator.phone) await sendSMS(event.creator.phone, message);
      if (event.creator.whatsapp) await sendWhatsApp(event.creator.whatsapp, message);

      // Participant notifications (SMS/WhatsApp)
      for (const participant of event.participants) {
        if (participant.phone) await sendSMS(participant.phone, message);
        if (participant.whatsapp) await sendWhatsApp(participant.whatsapp, message);
      }
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: 'Failed to send reminders' }, { status: 500 });
  }
}