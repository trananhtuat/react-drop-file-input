import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { storage } from './firebase';
import { db } from './firebase';

function App() {
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
            <ul>
                {videos.map((video, index) => (
                    <li key={index}>
                        <p>Asset: {video.asset}</p>
                        <p>Game: {video.game}</p>
                        <p>Description: {video.description}</p>
                        <video controls>
                            <source src={video.mostRecentUploadURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <a href={video.mostRecentUploadURL} download>Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;