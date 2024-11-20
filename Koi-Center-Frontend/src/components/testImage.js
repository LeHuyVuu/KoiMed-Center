import React, { useState } from 'react';
import { fetchUpLoadImageAPI } from '../apis';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Please choose a file first!");
            return;
        }
      const response = await fetchUpLoadImageAPI(selectedFile);
        console.log(response);
    };

    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={uploadFile}>Upload to S3</button>
        </div>
    );
};

export default ImageUpload;
