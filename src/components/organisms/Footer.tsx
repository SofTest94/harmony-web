import React, { useRef, useEffect } from 'react';
import '../styles/HeaderStyles.scss';
import { handleScheduleAppointmentClick, handleSocialMediaClick } from '../../utils/functions';

const Footer: React.FC = () => {
  const handleIconClick = (op: number) => {
    switch (op) {
      case 1:
        handleScheduleAppointmentClick('7711129510', 'Hola!, me gustaria agendar una cita.');
        break;
      case 2:
        handleSocialMediaClick('https://www.facebook.com/HelldyTherapy');
        break;
      case 3:
        handleSocialMediaClick('https://www.instagram.com/helldytherapy.dermatofacional');
        break;
      case 4:
        handleSocialMediaClick('https://www.youtube.com/@helldytherapy8125');
        break;
      case 5:
        handleSocialMediaClick('https://www.tiktok.com');
        break;
    }
    console.log('click!!');
  };

  useEffect(() => {
    //
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          // height: '100%',
          backgroundImage: `url('/img/PIEimg.png')`, // Ruta de la imagen de fondo
          backgroundSize: 'cover', // Para cubrir todo el contenido del div
          backgroundPosition: 'center', // Para centrar la imagen de fondo
          paddingTop: '40px',
        }}
      >
        {/* Contenedor centrado */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'white',
          }}
        >
          {/* Titulo */}
          <h1 style={{ fontSize: '3vw', marginBottom: '0vw' }}>
            ¡Aquí comienza <br />
            tu mejor versión!
          </h1>
          {/* Texto */}
          <p style={{ fontSize: '1.5vw', marginBottom: '2vw', width: '35%', textAlign: 'center' }}>
            Déjanos tu nombre y teléfono para que nuestro asesor se contacte contigo a la brevedad posible.
          </p>
          {/* Botón */}
          <button
            style={{
              fontSize: '2vw',
              padding: '0.8vw 2vw',
              borderRadius: '0.5vw',
              border: 'none',
              color: '#0064A8',
              cursor: 'pointer',
            }}
            onClick={() => handleScheduleAppointmentClick('7711129510', 'Buenas tardes, me gustaria agendar una cita.')}
          >
            Agendar cita
          </button>
          {/* Fila con dos columnas */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '5vw' }}>
            {/* Primera columna */}
            <div style={{ width: '35%' }}>
              {/* Imagen */}
              <img src="/LogoHarmony.png" alt="Descripción de la imagen" style={{ width: '70%' }} />
              {/* Texto */}
              <p style={{ fontSize: '1.5vw', marginTop: '1vw' }}>
                Plaza Juárez 8 Centro, San Juan Teotihuacan, EDO. de México
              </p>
            </div>
            {/* Segunda columna */}
            <div style={{ width: '35%' }}>
              {/* Imagen */}
              <div
                style={{
                  paddingRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src="/img/icons/WhatsApp.png"
                  alt="Descripción de la imagen"
                  style={{ width: '10%', marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => handleIconClick(1)}
                />
                <img
                  src="/img/icons/Facebook.png"
                  alt="Descripción de la imagen"
                  style={{ width: '10%', marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => handleIconClick(2)}
                />
                <img
                  src="/img/icons/Instagram.png"
                  alt="Descripción de la imagen"
                  style={{ width: '10%', marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => handleIconClick(3)}
                />
                <img
                  src="/img/icons/Youtube.png"
                  alt="Descripción de la imagen"
                  style={{ width: '10%', marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => handleIconClick(4)}
                />
                <img
                  src="/img/icons/TikTok.png"
                  alt="Descripción de la imagen"
                  style={{ width: '10%', cursor: 'pointer' }}
                  onClick={() => handleIconClick(5)}
                />
              </div>

              <p style={{ fontSize: '1.5vw', marginTop: '2.5vw' }}>+55 7687 703 harmonytherapy.ht@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
