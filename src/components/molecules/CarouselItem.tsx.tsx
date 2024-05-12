import React from 'react';

interface CarouselItemProps {
  imageUrl: string;
  title: string;
  text: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ imageUrl, title, text }) => {
  return (
    <div
      style={{
        padding: '2vw',
        borderRadius: '2vw',
        textAlign: 'center',
        margin: '2vw',
        marginTop: '5vw',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '17vw',
          height: '20vw',
          borderRadius: '5%',
          border: '0.2vw solid #D9D9D9',
          overflow: 'hidden',
          backgroundColor: '#00D6B2',
          margin: 'auto',
        }}
      >
        <img
          src={imageUrl}
          alt="Descripción de la imagen"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '1vw' }}>
        <h2 style={{ fontSize: '1.5vw', marginBottom: '1vw' }}>{title}</h2>
        <p style={{ fontSize: '1.5vw', margin: '0', padding: '0' }}>{text}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
