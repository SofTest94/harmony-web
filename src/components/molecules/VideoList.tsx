import React from 'react';
// import './VideoList.scss';
import '../styles/VideoList.scss'

interface VideoData {
  id: number;
  nombre: string;
  detail: string;
  urlVideo: string;
}

interface VideoListProps {
  videos: VideoData[];
}

const VideoComponent: React.FC<VideoData> = ({ nombre, detail, urlVideo }) => (
  <div className="row">
    <div className="column">
      <h2>{nombre}</h2>
      <p>{detail}</p>
    </div>
    <div className="column">
      <iframe 
        src={urlVideo} 
        title={nombre} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  </div>
);

const VideoList: React.FC<VideoListProps> = ({ videos }) => (
  <div>
    {videos.map(video => (
      <VideoComponent 
        key={video.id} 
        {...video}
      />
    ))}
  </div>
);

export default VideoList;
