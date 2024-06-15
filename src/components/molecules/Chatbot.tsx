import React, { useEffect } from 'react';
import { chatbot_param } from '../../utils/chatbot';

const Chatbot: React.FC = () => {
  useEffect(() => {
    const tidioScript = document.createElement('script');
    tidioScript.src = chatbot_param;
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null;
};

export default Chatbot;
