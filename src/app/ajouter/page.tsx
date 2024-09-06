"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddStudent() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');  // Champ pour l'URL de l'image
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, address, email, phone, imageUrl }),  // Inclure imageUrl
      });

      if (response.ok) {
        setSuccessMessage('Étudiant ajouté avec succès!');
        setTimeout(() => {
          router.push('/accueil'); 
        }, 2000); 
      } else {
        console.error('Erreur lors de l\'ajout de l\'étudiant');
      }
    } catch (error) {
      console.error('Erreur de réseau:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ajouter un Étudiant</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700">Âge</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Adresse</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Téléphone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            {isSubmitting ? 'Envoi...' : 'Ajouter'}
          </button>
        </form>
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
