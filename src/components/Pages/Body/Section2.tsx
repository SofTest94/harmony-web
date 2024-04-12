import React from 'react';
import { imagesTexts } from '../../../utils/utils';
import '../../styles/Body/Section2.scss';
import CardServiceType from '../../molecules/CardServiceType';

const Section2: React.FC = () => {
  return (
    <>
      <div className="churrito">
        <div className="title-container">
          <h1 className="title">
            Es por ello que en Harmony nosotros te guiamos en cada paso hacia tu libertad tratando lesiones cómo:
          </h1>
        </div>
        <div className="image-text-container">
          {imagesTexts.map((imageText, index) => (
            <div key={index} className="image-text">
              <CardServiceType imageUrl={imageText.imageUrl} title={imageText.title} text={imageText.text} />
            </div>
          ))}
        </div>
        {/* <div className="churrito2"></div> */}
      </div>
    </>
  );
};

export default Section2;
