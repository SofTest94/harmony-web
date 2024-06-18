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
import QuestionAnswer from '../Pages/Body/QuestionAnswer';


import { removeDiacritics, isSimilar } from '../../utils/stringUtils';





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

const qnaList = [
  { question: "¿Cómo funciona el producto?", answer: "El producto funciona de manera eficiente mediante el uso de..." },
  { question: "¿Cuál es el tiempo de entrega?", answer: "El tiempo de entrega es de aproximadamente 3 a 5 días hábiles." },
  // Agrega más preguntas y respuestas aquí
];



const initialQnAList = [
  { question: "¿Cómo funciona el producto?", answer: "El producto funciona de manera eficiente mediante el uso de..." },
  { question: "¿Cuál es el tiempo de entrega?", answer: "El tiempo de entrega es de aproximadamente 3 a 5 días hábiles." },
  // Agrega más preguntas y respuestas aquí
];


const Body: React.FC<BodyProps> = ({ selectedBranch }) => {
  const [qnaList, setQnaList] = useState(initialQnAList);
  const [newQuestion, setNewQuestion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQnaList([...qnaList, { question: newQuestion, answer: '' }]);
      setNewQuestion('');
    }
  };

  const filteredQnAList = qnaList.filter(
    (qna) => 
      isSimilar(removeDiacritics(qna.question.toLowerCase()), removeDiacritics(searchTerm.toLowerCase())) ||
      isSimilar(removeDiacritics(qna.answer.toLowerCase()), removeDiacritics(searchTerm.toLowerCase()))
  );
  return (
    <div style={{ width: '100%' }}>
      <div id="section1" style={{paddingTop:'3vw'}}>
        <Section1 />
      </div>
      <div id="section2" style={{paddingTop:'5vw'}}>
        <Section2 selectedBranch={selectedBranch} />
      </div>
      <div id="section3" >
        <Section3 />
      </div>
      {/* <div id="section4" style={{paddingTop:'1vw'}}>
        <Section4 />
      </div> */}
      <div id="section4" style={{paddingTop:'1.8vw'}}>
        {/* <div style={{width:'100%', backgroundColor:'#283E7E'}}> */}
        <div style={{width:'100%', backgroundColor:'#1976d2'}}>
        < ReviewUpdate/>
        </div>
      </div>
      <div id="section5" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.10)' }}>
      <Section5 />
      </div>
      <div id="section6">
        <div
        style={{
          textAlign: 'center',
          width: '70%',
          margin: '0 auto',
          fontSize: '1.5vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
          minWidth: '70%',
          // paddingBottom:'5.5vw'
          paddingTop:'5vw'
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
      <div id="section7" style={{paddingTop:'3vw'}}>
        <ServiceList selectedBranch={selectedBranch} />
      </div>
      <div id="section8">
      <div style={{ padding: '5%', margin: '3%' }}>
      <div
        style={{
          textAlign: 'center',
          width: '70%',
          margin: '0 auto',
          fontSize: '1.5vw', // Tamaño de fuente ajustado al 3.5% del ancho de la ventana
          minWidth: '70%',
        }}
      >
        <h1>Preguntas y respuestas</h1>
      </div>
      
      <div style={{ marginBottom: '2vw' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca lo que quieres saber..."
          style={{ width: '97%', padding: '1vw', fontSize: '1.3vw',
            borderRadius: '15px',
            border: '1px solid #ccc', // Borde definido explícitamente
            boxShadow: 'none', // Asegura que no haya sombra

           }}
        />
      </div>
      <div style={{ marginBottom: '2vw', overflowY: 'auto', maxHeight: '60vh', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '15px' }}>
          {filteredQnAList.map((qna, index) => (
            <QuestionAnswer key={index} question={qna.question} answer={qna.answer} />
          ))}
        </div>
      <div style={{ marginTop: '2vw' }}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="¿En que podemos apoyarte?"
          style={{ width: '88%', padding: '1vw', fontSize: '1.3vw',
            borderRadius: '15px',
            border: '1px solid #ccc', // Borde definido explícitamente
            boxShadow: 'none', 

           }}
        />
        <button onClick={handleAddQuestion} style={{ padding: '1vw', fontSize: '1vw', backgroundColor: '#00D6B2', color: '#fff', marginLeft: '1vw', cursor: 'pointer', 
          borderRadius: '15px',
          border: '1px solid #ccc', // Borde definido explícitamente
          // boxShadow: 'none', // Asegura que no haya sombra
        }}>
          Preguntar
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Body;


