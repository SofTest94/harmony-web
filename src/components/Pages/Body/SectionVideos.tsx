import React from 'react';
import '../../styles/VideoList.scss';

interface VideoData {
  id: number;
  nombre: string;
  detail: string;
  urlVideo: string;
}

interface VideoListProps {
  videos: VideoData[];
}

// Función para convertir la URL de YouTube a la URL de inserción
const getEmbedUrl = (url: string): string => {
  console.log({url})
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const VideoComponent: React.FC<VideoData> = ({ nombre, detail, urlVideo }) => (
  <div className="row">
    <div className="column">
      <h2>{nombre}</h2>
      <p>{detail}</p>
    </div>
    <div className="column">
      <iframe 
        src={getEmbedUrl(urlVideo)} 
        title={nombre} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  </div>
);

const SectionVideos: React.FC<VideoListProps> = ({ videos }) => (
  <div>
    {videos.map(video => (
      <VideoComponent 
        key={video.id} 
        {...video}
      />
    ))}
  </div>
);

export default SectionVideos;
