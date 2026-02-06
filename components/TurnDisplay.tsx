
import React, { useEffect, useState } from 'react';
import { TurnInfo } from '../types';
import { getCalmingMessage } from '../services/geminiService';

interface TurnDisplayProps {
  turn: TurnInfo;
}

const TurnDisplay: React.FC<TurnDisplayProps> = ({ turn }) => {
  const [calmMessage, setCalmMessage] = useState<string>('');
  const [loadingMsg, setLoadingMsg] = useState(true);

  useEffect(() => {
    const fetchMsg = async () => {
      const msg = await getCalmingMessage(turn.patientName);
      setCalmMessage(msg);
      setLoadingMsg(false);
    };
    fetchMsg();
  }, [turn.patientName]);

  return (
    <div className="animate-fade-in text-center py-4">
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-gray-800 mb-1">Gracias, {turn.patientName}.</h2>
        <p className="text-gray-500 font-light">Ya estás en nuestro sistema.</p>
      </div>

      <div className="bg-emerald-50 rounded-[2rem] p-10 mb-8 border border-emerald-100 shadow-inner inline-block w-full">
        <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-2">Tu número asignado</p>
        <div className="text-7xl font-serif text-emerald-700 tracking-tighter">
          {turn.number}
        </div>
      </div>

      <div className="space-y-4 px-2">
        <p className="text-gray-700 font-medium leading-relaxed">
          Te avisaremos cuando sea momento de ingresar.
        </p>
        
        <div className="h-1 w-12 bg-gray-200 mx-auto rounded-full my-6"></div>

        <div className={`transition-opacity duration-1000 ${loadingMsg ? 'opacity-0' : 'opacity-100'}`}>
          <p className="italic text-gray-400 font-light text-lg font-serif">
            "{calmMessage}"
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-center space-x-1">
        <div className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default TurnDisplay;
