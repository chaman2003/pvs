import type { IProject } from '@/lib/models/Project';

/** Mongoose metadata that must not cross the Server → Client boundary. */
const MONGO_META_KEYS = ['_id', '__v', 'createdAt', 'updatedAt'] as const;

/**
 * Convert a Mongoose lean document to a plain object safe for Client Components.
 * Strips ObjectId buffers and timestamp fields added by the schema.
 */
export function serializeProject(doc: unknown): IProject {
  const plain = JSON.parse(JSON.stringify(doc)) as IProject & Record<string, unknown>;
  for (const key of MONGO_META_KEYS) {
    delete plain[key];
  }
  return plain;
}

export function serializeProjects(docs: unknown[]): IProject[] {
  return docs.map(serializeProject);
}
