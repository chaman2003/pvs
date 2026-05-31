import mongoose from 'mongoose';
import { connectDB } from '@/lib/db/mongoose';
import { Project, type IProject } from '@/lib/models/Project';
import { seedProjects } from '@/content/seed-projects';

export async function getAllProjects(): Promise<IProject[]> {
  try {
    await connectDB();
    const projects = await Project.find().lean();
    if (projects.length > 0) return projects as IProject[];
  } catch {
    /* DB unavailable */
  }
  return seedProjects;
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  try {
    await connectDB();
    let project = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      project = await Project.findById(slug).lean();
    }
    if (!project) {
      project = await Project.findOne({ id: slug }).lean();
    }
    if (project) return project as IProject;
  } catch {
    /* DB unavailable */
  }
  return seedProjects.find((p) => p.id === slug) ?? null;
}

export async function getFeaturedProjects(): Promise<IProject[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.id);
}
