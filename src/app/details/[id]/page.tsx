'use client'
import { useEffect, useState } from 'react';
import { Student } from '@prisma/client'; 
import { useParams } from 'next/navigation';

export default function StudentDetails() {
  const parametre = useParams();
  const id  = parametre?.id;
  if(!id) return <div>il manque id</div>

  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchStudentDetails = async (id: string | string[]) => {
    try {
      const response = await fetch(`/api/students/${id}`);
      if (response.ok) {
        const data: Student = await response.json();
        setStudent(data);
      } else {
        setError('Failed to fetch student details.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching student details.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudentDetails(id);
    }
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Student Details</h1>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      {student.age && <p>Age: {student.age}</p>}
      {student.address && <p>Address: {student.address}</p>}
      {student.email && <p>Email: {student.email}</p>}
      {student.phone && <p>Phone: {student.phone}</p>}
    </div>
  );
}
