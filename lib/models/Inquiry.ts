import mongoose, { Schema, type Model } from 'mongoose';

export interface IInquiry {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  date?: Date;
  status?: string;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'new' },
  },
  { strict: false }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ?? mongoose.model<IInquiry>('Inquiry', inquirySchema);
