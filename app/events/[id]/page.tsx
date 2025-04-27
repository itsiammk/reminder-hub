import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder: Replace with MongoDB fetch
async function fetchEvent(id: string) {
  return {
    title: 'Ram’s Birthday',
    date: '2025-06-23',
    eventId: id,
  };
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await fetchEvent(params.id);
  const shareLink = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/events/${params.id}`;

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Date: {new Date(event.date).toDateString()}</p>
          <p className="mb-4">Share Link: <span className="text-primary">{shareLink}</span></p>
          <Link href={`/events/${params.id}/join`}>
            <Button>Join Event</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}