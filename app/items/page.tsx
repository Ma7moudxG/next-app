import { promises as fs } from 'fs';

interface Item {
    name: string;
    description: string;
    price: number;
}

export default async function ItemsPage () {
    const file = await fs.readFile(process.cwd() + '/data/items.json', 'utf8');
    const data: Item[] = JSON.parse(file);
    

  return data
}