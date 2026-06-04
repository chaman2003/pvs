import mongoose, { Schema, type Model } from 'mongoose';
import type { ProjectVideoSlot } from '@/content/backup-project-media';

export interface IProject {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  price?: string;
  image: string;
  gallery?: string[];
  features: string[];
  description: string;
  amenities?: string[];
  benefits?: string[];
  progress?: number;
  goal?: { label: string; value: string };
  youtubeId?: string;
  videos?: string[];
  videoFiles?: string[];
  /** Top inner-banner headline (coco backup titles). */
  bannerTitle?: string;
  /** Featured video above gallery. */
  leadVideo?: ProjectVideoSlot;
  /** Ordered poster tiles below gallery (duplicates allowed). */
  videoGrid?: ProjectVideoSlot[];
  timeline?: { start: string; completion: string };
  details?: { area: string; units: string; rera: string };
  featured?: boolean;
  seo?: { title: string; description: string };
}

const projectSchema = new Schema<IProject>(
  {
    id: String,
    title: String,
    category: String,
    location: String,
    status: String,
    price: String,
    image: String,
    gallery: [String],
    features: [String],
    description: String,
    amenities: [String],
    benefits: [String],
    progress: Number,
    goal: { label: String, value: String },
    youtubeId: String,
    videos: [String],
    videoFiles: [String],
    bannerTitle: String,
    leadVideo: { id: String, poster: String },
    videoGrid: [{ id: String, poster: String }],
    timeline: { start: String, completion: String },
    details: { area: String, units: String, rera: String },
    featured: Boolean,
    seo: { title: String, description: String },
  },
  { strict: false, timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', projectSchema);
