'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm } from '@/components/event-form';

export default function JoinEvent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    email: string;
    phone: string;
    whatsapp: string;
  }) => {
    try {
      const res = await fetch(`/api/events/${params.id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to join event');
      alert('Joined event! You’ll get reminders.');
      router.push('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Join Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <EventForm onSubmit={handleSubmit} submitText="Join Event" />
    </div>
  );
}