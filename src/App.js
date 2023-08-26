import './App.css';
import DropFileInput from './components/drop-file-input/DropFileInput';
import UploadButton from './components/upload-button/UploadButton';
import VideoList from './VideoList';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, db } from './firebase';
import { collection, addDoc } from "firebase/firestore"

function App() {
    const [file, setFile] = useState(null);
    const [assetname, setAssetname] = useState(""); // Initialize with an empty string
    const [gametitle, setGametitle] = useState("");
    const [description, setDescription] = useState("");

    const onFileChange = (files) => {
        const currentFile = files[0]
        setFile(currentFile)
        console.log(files);
    }

    const onAssetnameChange = (e) => {
        const assetname = e.target.value;
        console.log("New Assetname: ", assetname )
        setAssetname(assetname); // Correct: Using functional update
    }

    const onGametitleChange = (e) => {
        const newGametitle = e.target.value;
        setGametitle(newGametitle); // Correct: Using functional update
    }

    const onDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription); // Correct: Using functional update
    }

    const uploadToDatabase = (url, assetname, gametitle, description) => { 
        let docData = {
            mostRecentUploadURL: url,
            asset: assetname, 
            game: gametitle,
            description: description,
            carmodel: "test",
            metadata: "test",
        }

        const collectionRef = collection(db, "assets"); // Reference to the "assets" collection

        // Add a new document with auto-generated ID
        addDoc(collectionRef, docData)
          .then((docRef) => {
            console.log("Document added with ID: ", docRef.id);
            console.log("Assetname: ", assetname);
            console.log("Gametitle: ", gametitle);
            console.log("Description: ", description);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        
    }

    const handleClick = () => {
        if (file === null) return;
        const fileRef = ref(storage, `videos/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
            console.log(progress)
        }, (error) => {
            console.log("error :", error)
        }, () => {
            console.log("success!!")
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
                uploadToDatabase(downloadURL, assetname, gametitle, description)
                console.log(downloadURL)
            })
        })
    }

    return (
        <div className="box">
            <h2 className="header">
                Drop Game Assets here
            </h2>
            <DropFileInput
             onFileChange={(files) => onFileChange(files)}
             onAssetnameChange={onAssetnameChange} // Check if this is being passed correctly
             onGametitleChange={onGametitleChange} // Check if this is being passed correctly
             onDescriptionChange={onDescriptionChange} // Check if this is being passed correctly
            />
            <br></br>
            <UploadButton onClick={() => handleClick()} />
            <VideoList />
        </div>
    );
}

export default App;
