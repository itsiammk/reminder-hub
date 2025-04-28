import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Event } from '@/lib/models/event';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const participant: Event['participants'][number] = {
      email: body.email || undefined,
      phone: body.phone || undefined,
      whatsapp: body.whatsapp || undefined,
    };

    // Validate participant data
    if (!participant.email && !participant.phone && !participant.whatsapp) {
      console.error('Validation Error: At least one contact method is required');
      return NextResponse.json({ error: 'At least one contact method is required' }, { status: 400 });
    }

    const { id } = await params; // Await params to get id
    console.log('Joining event with shareLink:', `/events/${id}`);
    const db = await getDb();
    const result = await db.collection('events').updateOne(
      { shareLink: `/events/${id}` },
      { $push: { participants: participant } }
    );

    if (result.modifiedCount === 0) {
      console.error('Event not found for shareLink:', `/events/${id}`);
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    console.log('Participant added successfully');
    return NextResponse.json({ message: 'Joined event' });
  } catch (error) {
    console.error('Join Event Error:', error);
    return NextResponse.json({ error: 'Failed to join event', details: error.message }, { status: 500 });
  }
}