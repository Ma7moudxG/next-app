// fetchItems.ts
import { promises as fs } from 'fs';

interface Item {
  name: string;
  description: string;
  price: number;
}

const fetchItems = async () => {
  const file = await fs.readFile(process.cwd() + '/data/items.json', 'utf8');
  const items: Item[] = JSON.parse(file);
  return items;
}

export default fetchItems
