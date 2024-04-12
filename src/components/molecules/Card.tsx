import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        padding: '2vw', // Utilizando unidades relativas
        borderRadius: '2vw', // Utilizando unidades relativas
        textAlign: 'center',
        margin: '2vw',
        marginTop: '5vw', // Utilizando unidades relativas
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-3.7vw', // Utilizando unidades relativas
          left: '50%',
          transform: 'translateX(-50%)',
          width: '7vw', // Utilizando unidades relativas
          height: '7vw', // Utilizando unidades relativas
          borderRadius: '50%',
          border: '0.3vw solid #00D6B2', // Utilizando unidades relativas
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt="Descripción de la imagen"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
      <div style={{ backgroundColor: '#F5F5F5', borderRadius: '2vw', padding: '2vw' }}>
        <h2 style={{ fontSize: '2vw', marginBottom: '1.5vw' }}>{title}</h2>
        <p style={{ textAlign: 'justify', fontSize: '1vw' }}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
