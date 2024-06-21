import React, { useState } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Body from '../organisms/Body';
import FloatingButton from '../molecules/FloatingButton';
import Chatbot from '../molecules/Chatbot';//se elmino esto jms mvp2
import { Branches } from '../types/branches';

const MainTemplate: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branches | null>(null); // Inicializa con null o algún valor predeterminado


  const handleSelectBranch = (branches: Branches) => {
    setSelectedBranch(branches);
  };

  return (
    <>
      <Header onSelectBranch={handleSelectBranch} />
      
      <Body selectedBranch={selectedBranch} />
      
      <Footer selectedBranch={selectedBranch} />
      <FloatingButton />
      <Chatbot/>
    </>
  );
};

export default MainTemplate;
