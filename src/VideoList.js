import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import VideoThumbnail from './components/drop-file-input/VideoThumbnail'; 
import './components/drop-file-input/VideoThumbnail.css';

function VideoList() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            // Fetch videos from Firebase Firestore
            const querySnapshot = await getDocs(collection(db, "assets"));
            const videosArray = [];
            querySnapshot.forEach((doc) => {
                videosArray.push(doc.data());
            });
            setVideos(videosArray);
        }
        fetchVideos();
    }, []);

    return (
        <div className="video-list">
            <h2>Downloadable Videos</h2>
            <ul className="video-list-container">
                {videos.map((video, index) => (
                    <li key={index} className="video-list-item">
                        <p>Asset: {video.asset}</p>
                        <p>Game: {video.game}</p>
                        <p>Description: {video.description}</p>
                        <VideoThumbnail videoUrl={video.mostRecentUploadURL} />
                        <a href={video.mostRecentUploadURL} download>Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VideoList;
