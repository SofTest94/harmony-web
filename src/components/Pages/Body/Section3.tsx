import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button';
import TextContent from './SubPages/TextContent';
import TitleAndCarousel from './SubPages/TitleAndCarousel';


const Section3: React.FC = () => {
  return (
    <>
      <div style={{ backgroundColor: '#F9EC08' }}>
        <TextContent />
        <TitleAndCarousel />
      </div>
    </>
  );
};

export default Section3;
