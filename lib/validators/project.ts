import { z } from 'zod';

const projectFields = {
  projectName: z.string().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  price: z.string().optional(),
  plotSize: z.string().optional(),
  totalArea: z.string().optional(),
  description: z.string().optional(),
  imageData: z.string().optional(),
  image: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  videoFiles: z.array(z.string()).optional(),
  youtubeId: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
};

export const projectAddSchema = z.object(projectFields);

export const projectUpdateSchema = z.object(projectFields);
