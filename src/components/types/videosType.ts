export interface VideosType {
    _id: string;
    urlVideo: string;
    title: string;
    description: string;
  }
  
  export interface UpdateVideos {
    _id: string;
    url_video: string;
    title: string;
    description: string;
  }
  
  export interface CreateVideos {
    url_video: string;
    title: string;
    description: string;
  }
  