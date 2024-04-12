// src/components/templates/MainTemplate.tsx
import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Body from '../organisms/Body';

interface MainTemplateProps {
  children?: React.ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default MainTemplate;
