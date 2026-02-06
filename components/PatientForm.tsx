
import React, { useState } from 'react';

interface PatientFormProps {
  onCheckIn: (firstName: string, lastName: string) => void;
  isLoading: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ onCheckIn, isLoading }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      onCheckIn(firstName.trim(), lastName.trim());
    }
  };

  return (
    <div className="animate-fade-in flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-3xl font-serif text-gray-800 mb-2">Bienvenido</h1>
      <p className="text-gray-500 mb-8 font-light">Por favor, indícanos tu nombre para recibirte.</p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Nombre"
              className="w-full bg-white/50 border-b border-gray-200 py-3 px-1 text-lg outline-none focus:border-emerald-400 transition-colors placeholder:text-gray-300"
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apellido"
              className="w-full bg-white/50 border-b border-gray-200 py-3 px-1 text-lg outline-none focus:border-emerald-400 transition-colors placeholder:text-gray-300"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!firstName || !lastName || isLoading}
          className={`w-full mt-8 py-4 rounded-2xl text-white font-medium text-lg shadow-lg transition-all duration-300 transform
            ${isLoading 
              ? 'bg-emerald-300 cursor-not-allowed scale-95' 
              : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 hover:shadow-emerald-200'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </span>
          ) : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
