"use client"

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Hero from '@components/Hero';
import Footer from '@components/Footer';
import { analytics } from './firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import {Card, CardHeader, CardFooter, CardBody, Image} from "@nextui-org/react";
import Features from '@components/Features';
import Contact from '@components/Contact';

const Home = () => {


  const [fileUpload, setFileUpload] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [flaskImageURL, setFlaskImageURL] = useState('');
  const [flaskImageFilename, setFlaskImageFILENAME] = useState('');
  const [flaskImageExtention, setFlaskImageEXTENTION] = useState('');
  

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    setFileUpload(files);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setFileUpload(files);
  };

  const cancelFileSelect = () => {
    setFileUpload(null);
  };

  const sendLinkToBackend = async (link) => {
    try {
      const response = await axios.post('https://rembg-backend-api-81fb32f281b5.herokuapp.com/remove-background', { image_url: link });

      // console.log('API response:', response.data.image);
      setFlaskImageURL(response.data); // Display the returned image
      setFlaskImageFILENAME(response.data.filename); 
      setFlaskImageEXTENTION(response.data.extention);
    } catch (error) {
      // Handle error
      console.error(error);
    }
    finally {
      setUploading(false); // Stop the progress bar
    }
  };

  const [imageSelected, setImageSelected] = useState(false);

  const handleSelectAnotherImage = () => {
    setFileUpload(null);
    setDownloadURL('');
    setFlaskImageURL('');
    setFlaskImageFILENAME('');
    setFlaskImageEXTENTION('');
    setImageSelected(false);
  };

  const upload = () => {
    // console.log(fileUpload);
    if (fileUpload) {
      setUploading(true);
      const storageRef = ref(analytics, 'images/' + fileUpload[0].name);
      uploadBytes(storageRef, fileUpload[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // console.log('File available at', url);
          setDownloadURL(url);
          setImageSelected(true); // Image is selected
        });
        // console.log('Uploaded a blob or file!');
      });
    } else {
      console.log('No file selected');
    }
  };

  useEffect(() => {
    if (downloadURL) {
      sendLinkToBackend(downloadURL); // Send the link to the backend API when downloadURL changes
    }
  }, [downloadURL]);

  const handleDownloadImage = () => {
    // const base64Data = flaskImageURL.split(',')[1]; // Extract the base64 data from the URL
    saveBase64DataToFile(flaskImageURL.image, `${flaskImageFilename}_background_removed.${flaskImageExtention}`);
  };
  
  const saveBase64DataToFile = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/${flaskImageExtention};base64,${base64Data}`;
    link.download = filename;
    link.click();
  };
  
  return (
    <section className="w-full flex-center flex-col join mb-12">
      <Hero />
  
      {fileUpload ? (
        <div className="w-[680px] h-[500px] px-8 rounded-2xl flex flex-col justify-center items-center bg-gradient-to-tr from-black-100 to-gray-300 text-white shadow-2xl">
          {uploading ? (
            <span className="loading loading-infinity loading-lg text-neutral"></span>
          ) : (
            <>
              {!downloadURL ? (
                <>
                  <p className="medium_text text-center mt-4 text-black-600">File Selected: {fileUpload[0].name}</p>
                  <button className="outline_btn text-sm mt-4" onClick={upload}>
                    Upload
                  </button>
                  <button className="outline_btn text-sm text-center mt-4" onClick={cancelFileSelect}>
                    <FaTimes />
                    <p>Cancel</p>
                  </button>
                </>
              ) : (
                <>
                  {/* <p className="medium_text text-center mt-4 text-black-600">File available at: {downloadURL}</p> */}
                  {flaskImageURL ? (

                        <section>
                          <h3 className='medium_text text-center mb-5 shadow-2xl'>Slide to see the result</h3>
                          <div className=" carousel rounded-box shadow-2xl">
                          <div className="carousel-item w-full shadow-2xl">
                            <img src={downloadURL} className="w-full" alt="Tailwind CSS Carousel component" />
                          </div> 
                          <div className="carousel-item w-full">
                            <img src={`data:image/jpeg;base64, ${flaskImageURL.image}`} className="w-full" alt="Tailwind CSS Carousel component"  
                            
                            style={{
                              backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)`,
                              backgroundSize: "25px 25px",
                              backgroundPosition: "0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px",
                              backgroundColor: "transparent"
                            }}
                            
                            />
                          </div> 
                        </div>

                        <div className="button-row flex justify-between mt-5 mb-8">
                          <button className="select-image-button outline_btn shadow-2xl" onClick={handleSelectAnotherImage}>
                            Select Another Image
                          </button>
                          <button className="download-image-button black_btn shadow-2xl" onClick={handleDownloadImage}>
                            Download Image
                          </button>
                        </div>

                        </section>


                  ) : (
                    <>
                      <p className="medium_text text-center mt-4 text-black-600">File Selected: {fileUpload[0].name}</p>
                      <button className="outline_btn text-sm mt-4" onClick={upload}>
                        Upload
                      </button>
                      <button className="outline_btn text-sm text-center mt-4" onClick={cancelFileSelect}>
                        <FaTimes />
                        <p>Cancel</p>
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className={`w-[680px] h-[480px] px-8 rounded-2xl flex flex-col justify-center items-center bg-gradient-to-tr ${
            dragOver ? 'from-amber-300 to-red-300' : 'from-black-500 to-gray-300'
          } text-white shadow-lg`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="medium_text text-center">Drag and drop a file here</p>
          <p className="medium_text text-center mb-4">or</p>
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="outline_btn">
            Select a File
          </label>
        </div>
      )}
    <Features />
    <Contact />
    </section>
  
  );
};

export default Home;

