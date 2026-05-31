import mongoose, { Schema, type Model } from 'mongoose';

export interface INewsletter {
  email: string;
  status?: string;
  date?: Date;
}

const newsletterSchema = new Schema<INewsletter>(
  {
    email: String,
    status: { type: String, default: 'active' },
    date: { type: Date, default: Date.now },
  },
  { strict: false }
);

export const Newsletter: Model<INewsletter> =
  mongoose.models.Newsletter ??
  mongoose.model<INewsletter>('Newsletter', newsletterSchema);
