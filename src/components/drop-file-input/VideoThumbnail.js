import React from 'react';
import './VideoThumbnail.css';

const VideoThumbnail = ({ videoUrl }) => {
    return (
      <div className="video-thumbnail">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoThumbnail;