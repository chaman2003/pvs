import 'dotenv/config';
import mongoose from 'mongoose';
import { seedProjects } from '../content/seed-projects';

const MONGO_URI = process.env.MONGO_URI;

const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function seed() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const project of seedProjects) {
    await Project.findOneAndUpdate({ id: project.id }, project, { upsert: true, new: true });
    console.log(`Seeded: ${project.id}`);
  }

  console.log(`Done. ${seedProjects.length} projects seeded.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
