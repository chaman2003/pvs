import 'dotenv/config';
import mongoose from 'mongoose';
import { seedProjects } from '../content/seed-projects';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pvs_promoters';

const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function seed() {
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
