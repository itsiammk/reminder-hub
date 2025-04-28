import { ObjectId } from 'mongodb';

export interface Event {
  _id?: ObjectId;
  title: string;
  dateTime: string; // ISO string, e.g., "2025-06-23T14:30:00Z"
  creator: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  participants: Array<{
    email?: string;
    phone?: string;
    whatsapp?: string;
  }>;
  shareLink: string;
}