import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDb } from '@/lib/db';

async function fetchEvent(id: string) {
  const db = await getDb();
  const event = await db.collection('events').findOne({ shareLink: `/events/${id}` });
  return event || null;
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await params to get id
  const event = await fetchEvent(id);
  if (!event) {
    return <div>Event not found</div>;
  }
  const shareLink = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/events/${id}`;

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Date & Time: {new Date(event.dateTime).toLocaleString()}</p>
          <p className="mb-4">Share Link: <span className="text-primary">{shareLink}</span></p>
          <Link href={`/events/${id}/join`}>
            <Button>Join Event</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}