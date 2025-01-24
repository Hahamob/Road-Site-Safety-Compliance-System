import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Image analyzed successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.detail || "Failed to analyze image."}`);
      } else {
        setMessage("Unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
