import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function GET() {
  const file = await fs.readFile(process.cwd() + '/data/items.json', 'utf8');
  const items = JSON.parse(file);
  return NextResponse.json(items);
}
