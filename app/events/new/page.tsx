'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm } from '@/components/event-form';
import emailjs from '@emailjs/browser';

export default function NewEvent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    title?: string;
    dateTime?: string;
    email: string;
    phone: string;
    whatsapp: string;
  }) => {
    console.log(formData, 'fd----');

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create event');
      const { shareLink } = await res.json();

      // Client-side EmailJS for creation notification
      if (formData.email) {
        console.log('Sending EmailJS to:', formData.email);
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            name: 'User',
            subject: `Event Created: ${formData.title}`,
            message: `You joined "${formData.title}" on ${new Date(formData.dateTime!).toLocaleString()}. You'll be reminded 12 hours before. Share: ${process.env.NEXT_PUBLIC_VERCEL_URL}${shareLink}`,
            email: formData.email,

          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
        console.log('EmailJS sent successfully');
      }

      alert(`Event created! Share: ${shareLink}`);
      router.push('/');
    } catch (err) {
      console.error('Create Event Client Error:', err);
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