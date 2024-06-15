import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date?:string;
}

const CardReviewUpdate: React.FC<CardProps> = ({ title, description, imageUrl, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = description.substring(0, 100);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        padding: '2vw',
        borderRadius: '2vw',
        textAlign: 'center',
        margin: '2vw',
        marginTop: '5vw',
      }}
    >
      {/* Primera fila */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2vw' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '3vw',
              height: '3vw',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '1vw',
            }}
          >
            <img
              src={imageUrl}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '1.3vw', fontWeight:'700' }}>{title}</p>
            <p style={{ margin: 0, fontSize: '1vw', color: 'gray', fontWeight:'700' }}>{date !== undefined ? date : '21/11/1994'}</p>
          </div>
        </div>
        <div>
          <FaFacebook style={{ width: '2.8vw', height: '2.8vw' }} color="#3b5998" />
        </div>
      </div>

      {/* Segunda fila */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vw' }}>
        {/* Aquí podrías agregar el componente de rating (estrellas) */}
        <p style={{ margin: 0, fontSize: '1.2vw' }}>⭐⭐⭐⭐⭐</p>
      </div>

      {/* Tercera fila */}
      <div style={{ textAlign: 'left' }}>
        <p style={{ fontSize: '1.3vw' }}>
          {isExpanded ? description : `${shortDescription}...`}
        </p>
        <button 
          onClick={handleToggle} 
          style={{ fontSize: '1vw', color: '#00D6B2', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isExpanded ? 'Ver menos' : 'Leer más'}
        </button>
      </div>
    </div>
  );
};

export default CardReviewUpdate;
