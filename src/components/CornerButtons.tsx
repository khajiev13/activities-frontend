import React from 'react';
import { Chatbot } from '@/components/Chatbot';
import { CreateActivity } from '@/components/Drawer';
import { useLocation } from 'react-router-dom';
const CornerButtons: React.FC = () => {
  const location = useLocation();
  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-4">
      {location.pathname === '/activities' && <CreateActivity />}
      <Chatbot />
    </div>
  );
};

export default CornerButtons;
