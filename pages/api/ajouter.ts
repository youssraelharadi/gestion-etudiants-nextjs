
import { PrismaClient, Student } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface AddStudentRequest {
  name: string;
  age?: number; 
  address?: string; 
  email?: string; 
  phone?: string; 
}

type Data = Student | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, age, address, email, phone }: AddStudentRequest = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          age: age ?? null, 
          address: address ?? null, 
          email: email ?? null, 
          phone: phone ?? null, 
        },
      });
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ error: 'An error occurred while adding student' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
