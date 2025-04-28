'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface EventFormProps {
  onSubmit: (formData: {
    title?: string;
    dateTime?: string; // Changed from date
    email: string;
    phone: string;
    whatsapp: string;
  }) => void;
  submitText: string;
}

export function EventForm({ onSubmit, submitText }: EventFormProps) {
  const [form, setForm] = useState({
    title: '',
    date: '', // For date input
    time: '', // For time input
    email: '',
    phone: '',
    whatsapp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine date and time into ISO string
    const dateTime = form.date && form.time ? `${form.date}T${form.time}:00Z` : undefined;
    onSubmit({
      title: form.title,
      dateTime, // Pass combined dateTime
      email: form.email,
      phone: form.phone,
      whatsapp: form.whatsapp,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitText === 'Create Event' && (
            <>
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Ram's Birthday"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Event Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone for SMS (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+919876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+919876543210"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            {submitText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}