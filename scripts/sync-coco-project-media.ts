import 'dotenv/config';
import mongoose from 'mongoose';
import {
  COCO_PROJECT_IDS,
  getCocoMediaPayload,
  type CocoProjectId,
} from '../content/backup-project-media';

const MONGO_URI = process.env.MONGO_URI;

const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

async function sync() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const id of COCO_PROJECT_IDS) {
    const media = getCocoMediaPayload(id as CocoProjectId);
    const result = await Project.findOneAndUpdate(
      { id },
      { $set: media },
      { new: true }
    );

    if (result) {
      console.log(`Updated media: ${id}`);
    } else {
      console.warn(`No project found for id="${id}" — run npm run seed first`);
    }
  }

  await mongoose.disconnect();
  console.log('Done.');
}

sync().catch((err) => {
  console.error(err);
  process.exit(1);
});
