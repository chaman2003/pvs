import { connectDB, isDbConfigured } from '@/lib/db/mongoose';
import { Project } from '@/lib/models/Project';
import { seedProjects } from '@/content/seed-projects';

let seedPromise: Promise<void> | null = null;

export async function ensureDbSeeded(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!seedPromise) {
    seedPromise = seedOnce();
  }
  await seedPromise;
}

async function seedOnce() {
  try {
    const conn = await connectDB();
    if (!conn) return;

    const count = await Project.countDocuments();
    if (count > 0) return;

    for (const project of seedProjects) {
      await Project.findOneAndUpdate({ id: project.id }, project, { upsert: true, new: true });
    }

    console.log(`[seed] Initialized ${seedProjects.length} projects in MongoDB`);
  } catch (error) {
    console.error('[seed] Failed to initialize database:', error);
  }
}
