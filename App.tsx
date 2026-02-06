
import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import TurnDisplay from './components/TurnDisplay';
import { TurnInfo } from './types';

const App: React.FC = () => {
  const [turn, setTurn] = useState<TurnInfo | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Persistence check: If a user already checked in this session, keep their turn
  useEffect(() => {
    const savedTurn = localStorage.getItem('onco_turn');
    if (savedTurn) {
      const parsed = JSON.parse(savedTurn);
      // Optional: Check if the turn is from today
      const turnDate = new Date(parsed.timestamp).toDateString();
      const today = new Date().toDateString();
      if (turnDate === today) {
        setTurn(parsed);
      } else {
        localStorage.removeItem('onco_turn');
      }
    }
  }, []);

  const handleCheckIn = (firstName: string, lastName: string) => {
    setIsTransitioning(true);
    
    // In a real shared backend, this would fetch from an API
    // Here we simulate a unique turn number based on local sequence
    const lastNum = parseInt(localStorage.getItem('onco_sequence') || '10');
    const newNum = lastNum + 1;
    localStorage.setItem('onco_sequence', newNum.toString());

    const newTurn: TurnInfo = {
      number: newNum.toString(),
      patientName: firstName,
      timestamp: Date.now(),
    };

    // Simulate network delay for a human feel
    setTimeout(() => {
      setTurn(newTurn);
      localStorage.setItem('onco_turn', JSON.stringify(newTurn));
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Decorative Organic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

      <main className={`w-full max-w-md glass rounded-[2.5rem] shadow-2xl p-8 md:p-12 transition-all duration-700 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        {!turn ? (
          <PatientForm onCheckIn={handleCheckIn} isLoading={isTransitioning} />
        ) : (
          <TurnDisplay turn={turn} />
        )}
      </main>

      {/* Footer Branding - Subtle */}
      <footer className="mt-12 text-gray-400 text-sm font-light tracking-wide animate-fade-in">
        Centro de Cuidados Oncológicos
      </footer>
    </div>
  );
};

export default App;
