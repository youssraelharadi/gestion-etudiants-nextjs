import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EtudiantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/test${id}`)
        .then((response) => response.json())
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;

  if (!student) return <p>Aucun détail trouvé.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Détails de l'Étudiant</h1>
        <p className="text-gray-700"><strong>ID:</strong> {student.id}</p>
        <p className="text-gray-700"><strong>Nom:</strong> {student.name}</p>
        <p className="text-gray-700"><strong>Âge:</strong> {student.age}</p>
        <p className="text-gray-700"><strong>Classe:</strong> {student.grade}</p>
        <button
          onClick={() => router.push('/accueil')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Retour à Accueil
        </button>
      </div>
    </div>
  );
}
