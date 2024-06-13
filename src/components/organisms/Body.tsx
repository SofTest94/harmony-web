import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { data_carrusel, imagesTexts } from '../../utils/utils';
import Section1 from '../Pages/Body/Section1';
import Section2 from '../Pages/Body/Section2';
import Section3 from '../Pages/Body/Section3';
import Section4 from '../Pages/Body/Section4';
import Section5 from '../Pages/Body/Section5';
import '../styles/HeaderStyles.scss';
import VideoList from '../molecules/VideoList';
import SectionVideoList from '../Pages/Body/SectionVideos';
import Videos from '../Pages/Body/videos';
import ServiceList from '../Pages/Body/ServiceList';
import { Link, Typography } from '@mui/material';
import ReviewUpdate from '../Pages/Body/ReviewUpdate';




// const Body: React.FC = () => {
interface BodyProps {
  selectedBranch: string;
}

const videoData = [
  {
    title: "Plan de Tratamiento en Fisioterapia",
    description: "Evaluación Inicial1: Basada en la historia clínica y el examen físico, se identifican las áreas problemáticas. Objetivos del Tratamiento: Definición de objetivos a corto y largo plazo, como reducir el dolor, mejorar la movilidad y fortalecer los músculos. Intervenciones Terapéuticas: Ejercicios Terapéuticos: Rutinas específicas para mejorar la fuerza, flexibilidad y rango de movimiento.",
    url: "https://www.youtube.com/watch?v=c6lNu1JNa38&pp=ygUMZmlzaW90ZXJhcGlh"
  },
  {
    title: "Otro Video de Fisioterapia",
    description: "Evaluación Inicial2: Basada en la historia clínica y el examen físico, se identifican las áreas problemáticas. Objetivos del Tratamiento: Definición de objetivos a corto y largo plazo, como reducir el dolor, mejorar la movilidad y fortalecer los músculos. Intervenciones Terapéuticas: Ejercicios Terapéuticos: Rutinas específicas para mejorar la fuerza, flexibilidad y rango de movimiento.",
    url: "https://www.youtube.com/watch?v=DCz4RStjxUM&pp=ygUMZmlzaW90ZXJhcGlh"
  },
  {
    title: "Tercer Video de Fisioterapia",
    description: "Evaluación Inicial3: Basada en la historia clínica y el examen físico, se identifican las áreas problemáticas. Objetivos del Tratamiento: Definición de objetivos a corto y largo plazo, como reducir el dolor, mejorar la movilidad y fortalecer los músculos. Intervenciones Terapéuticas: Ejercicios Terapéuticos: Rutinas específicas para mejorar la fuerza, flexibilidad y rango de movimiento.",
    url: "https://www.youtube.com/watch?v=NLwDS3veHtw&pp=ygUMZmlzaW90ZXJhcGlh"
  }
];

const Body: React.FC<BodyProps> = ({ selectedBranch }) => {
  return (
    <div style={{ width: '100%' }}>
      <div id="section1">
        <Section1 />
      </div>
      <div id="section2">
        <Section2 selectedBranch={selectedBranch} />
      </div>
      <div id="section3">
        <Section3 />
      </div>
      <div id="section4">
        <Section4 />
      </div>
      <div id="section5">
        <Section5 />
      </div>
      <div id="section6" style={{marginBottom:10}}>
        {/* <SectionVideoList videos={data} /> */}
        {/* <Videos videos={videoData}/> */}

        <div
        style={{
          textAlign: 'center',
          width: '70%',
          margin: '0 auto',
          fontSize: '1.5vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
          minWidth: '70%',
          paddingBottom:'5.5vw'
        }}
      >
        <h1>Echa un vistazo a nuestros videos</h1>
      </div>
        {videoData.map((video, index) => (
        <Videos key={index} title={video.title} description={video.description} url={video.url} />
      ))}
      
      <div
        style={{
          textAlign: 'right',
          width: '90%',
          // margin: '0 auto',
          fontSize: '2vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
          minWidth: '80%',
          paddingTop:'1.5vw'
        }}
      >
        
        <Link href="https://www.youtube.com/channel/UCiHli8YiB3YalYVsltDFltw" target="_blank" rel="noopener">
          ver más
        </Link>
      
      </div>
      </div>
      <div id="section7">
        <ServiceList selectedBranch={selectedBranch} />
      </div>
      <div id="section7">
        <ServiceList selectedBranch={selectedBranch} />
      </div>
      <div id="section8">
        {/* <div style={{width:'100%', backgroundColor:'#283E7E'}}> */}
        <div style={{width:'100%', backgroundColor:'#1976d2'}}>
        < ReviewUpdate/>
        </div>
      </div>
    </div>
  );
};

export default Body;
