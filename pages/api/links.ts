import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const linkData = JSON.parse(req.body);
    const savedLink = await prisma.link.create({ data: linkData });
    res.status(200).json(savedLink);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};