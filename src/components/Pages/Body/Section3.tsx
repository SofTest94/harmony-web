import React, { useEffect, useState } from 'react';
import TextContent from './SubPages/TextContent';
import TitleAndCarousel from './SubPages/TitleAndCarousel';

interface Section3Props {
  branchId?: string;
}

const Section3: React.FC<Section3Props> = ({ branchId }) => {
  const [currentBranchId, setCurrentBranchId] = useState<string | undefined>(branchId);

  // useEffect se ejecutará cada vez que branchId cambie
  useEffect(() => {
    setCurrentBranchId(branchId);
  }, [branchId]); // Se especifica branchId como dependencia para que useEffect se ejecute cuando cambie

  return (
    <>
      <div style={{ backgroundColor: '#F9EC08' }}>
        <TextContent />
        <TitleAndCarousel branchId={currentBranchId} /> {/* Pasamos currentBranchId como prop a TitleAndCarousel */}
      </div>
    </>
  );
};

export default Section3;
