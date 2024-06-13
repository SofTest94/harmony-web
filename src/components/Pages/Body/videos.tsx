import React from 'react';
import '../../styles/Body/videos.scss';

interface VideoProps {
  title: string;
  description: string;
  url: string;
}

const getEmbedUrl = (url: string): string => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const Video: React.FC<VideoProps> = ({ title, description, url }) => {
  return (
    <div className="section-container-videos">
      <div className="section-content-videos">
        <div className="section-text-videos">
          <div>
            <h1>{title}</h1>
          </div>
          <p>{description}</p>
        </div>
        <div className="section-image-videos">
          <iframe
            className='image-videos'
            src={getEmbedUrl(url)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Video;
