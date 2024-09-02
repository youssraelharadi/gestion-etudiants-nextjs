"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

interface Student {
  id: number;
  name: string;
}

export default function Accueil() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch('/api/test');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data: Student[] = await response.json();
        console.log('Fetched data:', data); // Vérifie les données récupérées
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudents();
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Liste des Étudiants</h1>
        
        {/* Bouton Ajouter */}
        <Link href="/ajouter" className="inline-block mb-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
          Ajouter un Étudiant
        </Link>
        
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Détails</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b text-center">{student.id}</td>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link href={`/student/${student.id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEye className="inline-block w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 border-b text-center">Aucun étudiant trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
