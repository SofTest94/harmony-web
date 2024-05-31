// src/components/organisms/ChatWidget.tsx

import React, { useEffect } from 'react';
import loadTidioScript from '../atoms/TidioScriptLoader';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    loadTidioScript();
  }, []);

  return (
    <div>
      {/* Puedes agregar cualquier contenido adicional aquí si es necesario */}
    </div>
  );
};

export default ChatWidget;
