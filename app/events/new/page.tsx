'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm } from '@/components/event-form';

export default function NewEvent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    title?: string;
    date?: string;
    email: string;
    phone: string;
    whatsapp: string;
  }) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create event');
      const { shareLink } = await res.json();
      alert(`Event created! Share: ${shareLink}`);
      router.push('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <EventForm onSubmit={handleSubmit} submitText="Create Event" />
    </div>
  );
}