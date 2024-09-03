import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const student = await prisma.student.findUnique({
        where: { id: Number(id) },  
      });

      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'An error occurred while fetching student' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
