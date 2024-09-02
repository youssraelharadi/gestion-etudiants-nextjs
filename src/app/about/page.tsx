import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          src="https://img.freepik.com/photos-premium/enfants-sont-assis-bureau-mains-air_1230717-264686.jpg?w=740"
          alt="Gestion Scolaire"
          className="w-full h-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Gestion Scolaire</h1>
        <p className="text-gray-700 mb-6 text-center">
          Découvrez notre plateforme de gestion scolaire où vous pouvez suivre les étudiants, 
          consulter les détails des cours et bien plus encore. Nous offrons une interface 
          intuitive et des outils puissants pour faciliter la gestion scolaire.
        </p>
        <Link href="/accueil">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            Aller à Accueil
          </div>
        </Link>
      </div>
    </div>
  );
}
