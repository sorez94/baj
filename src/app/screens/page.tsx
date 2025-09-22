'use client'
import React, {useState} from 'react';
import ChequeAccountsScreen from '@/features/cheque/screens/ChequeAccountsScreen';
import ChequeCheckbooksScreen from '@/features/cheque/screens/ChequeCheckbooksScreen';
import ChequeDeliveryScreen from '@/features/cheque/screens/ChequeDeliveryScreen';
import ChequeSheetsScreen from '@/features/cheque/screens/ChequeSheetsScreen';
import {ChequeStartScreen} from '@/features/cheque';
import ChequeUploadScreen from '@/features/cheque/screens/ChequeUploadScreen';
import ChequeConfirmScreen from '@/features/cheque/screens/ChequeConfirmScreen';
import ChequeScreen from "@/features/cheque/screens/ChequeScreen";

type CardType = {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
};

const Screens: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode | null>(null);

  const cards: CardType[] = [
    {
      id: 'ChequeAccountsScreen',
      title: 'Cheque Accounts',
      description: 'Manage cheque accounts',
      component: <ChequeAccountsScreen/>
    },
    {
      id: 'ChequeCheckbooksScreen',
      title: 'Cheque Checkbooks',
      description: 'Manage cheque checkbooks',
      component: <ChequeCheckbooksScreen/>
    },
    {
      id: 'ChequeDeliveryScreen',
      title: 'Cheque Delivery',
      description: 'Manage cheque delivery',
      component: <ChequeDeliveryScreen/>
    },
    {
      id: 'ChequeSheetsScreen',
      title: 'Cheque Sheets',
      description: 'Manage cheque sheets',
      component: <ChequeSheetsScreen/>
    },
    {
      id: 'ChequeStartScreen',
      title: 'Cheque Start',
      description: 'Start a new cheque process',
      component: <ChequeStartScreen/>
    },
    {id: 'ChequeScreenStatus', title: 'Cheque Status', description: 'View cheque status', component: <ChequeScreen/>},
    {
      id: 'ChequeUploadScreen',
      title: 'Cheque Upload',
      description: 'Upload cheque details',
      component: <ChequeUploadScreen/>
    },
    {
      id: 'ChequeConfirmScreen',
      title: 'Confirm Cheque',
      description: 'Confirm cheque details',
      component: <ChequeConfirmScreen/>
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 flex flex-col items-center justify-center py-10 px-6">
      {/* Card Grid */}
      {activeComponent === null ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveComponent(card.component)}
              className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 p-8 flex flex-col items-center justify-between"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{card.title}</h2>
              <p className="text-lg text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      ) : (
        // Display Selected Component Directly
        <>
          {activeComponent}
        </>
      )}
    </div>
  );
};

export default Screens;
