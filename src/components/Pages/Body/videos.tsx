import React, { useEffect, useState } from 'react';
import '../../styles/Body/videos.scss';


interface VideoProps {
  title: string;
  description: string;
  url_video: string;
}

const getEmbedUrl = (url: string): string => {
  
  if(url!==undefined){
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }else{
    return ""
  }
  
};

const Video: React.FC<VideoProps> = ({ title, description, url_video }) => {
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
            src={getEmbedUrl(url_video)}
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
