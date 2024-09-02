import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Récupérer tous les étudiants
      const students = await prisma.student.findMany();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  } else if (req.method === 'POST') {
    const { name, age, address, email, phone } = req.body;
    
    try {
      // Ajouter un nouvel étudiant
      const newStudent = await prisma.student.create({
        data: {
          name,
          age,
          address,
          email,
          phone,
        },
      });
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ error: 'An error occurred while adding student' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
