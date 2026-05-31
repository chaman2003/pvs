import fs from 'fs/promises';
import path from 'path';
import type { IInquiry } from '@/lib/models/Inquiry';

export type FileInquiry = IInquiry & {
  _id: string;
  date: string;
  status: string;
  source: 'file';
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.jsonl');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function saveInquiryToFile(
  data: Pick<IInquiry, 'name' | 'email' | 'phone' | 'subject' | 'message'>
): Promise<FileInquiry> {
  await ensureDataDir();
  const inquiry: FileInquiry = {
    _id: `file_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    date: new Date().toISOString(),
    status: 'new',
    source: 'file',
  };
  await fs.appendFile(INQUIRIES_FILE, `${JSON.stringify(inquiry)}\n`, 'utf8');
  return inquiry;
}

export async function listInquiriesFromFile(): Promise<FileInquiry[]> {
  try {
    const content = await fs.readFile(INQUIRIES_FILE, 'utf8');
    return content
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as FileInquiry)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
}
