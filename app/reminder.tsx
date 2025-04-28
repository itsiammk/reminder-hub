'use client';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Reminder() {
  useEffect(() => {
    const sendReminders = async () => {
      try {
        const res = await fetch('/api/cron', {
          headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
        });
        if (!res.ok) throw new Error('Failed to fetch events');
        const { events } = await res.json();

        for (const event of events) {
          const message = `Reminder: ${event.title} is in 12 hours at ${new Date(event.dateTime).toLocaleString()}!`;

          // Creator email
          if (event.creator.email) {
            await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
              {
                name: 'User',
                subject: `Reminder: ${event.title}`,
                message,
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
          }

          // Participant emails
          for (const participant of event.participants) {
            if (participant.email) {
              await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                  name: 'User',
                  subject: `Reminder: ${event.title}`,
                  message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
              );
            }
          }
        }
      } catch (error) {
        console.error('EmailJS Reminder Error:', error);
      }
    };

    sendReminders();
  }, []);

  return null;
}