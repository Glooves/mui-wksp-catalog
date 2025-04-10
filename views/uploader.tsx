/*
 Here's my prompt:
    Provide a typescript MGC React Component that is a 
    file uploader Providing a drop target block that's accepting of many mime 
    types of input files. Multiple selections OK and also directory paths can be specified as a source for uploading.

    */


import React, { useState, useCallback } from 'react';
import React from 'react';
import {useDropzone} from 'react-dropzone';
    
interface Props {
  onFilesUploaded: (files: File[]) => void;
  accept?: string;
}

const FileUploader: React.FC<Props> = ({ onFilesUploaded, accept }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    onFilesUploaded(files);
  }, [onFilesUploaded]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
      onFilesUploaded(files);
  }, [onFilesUploaded]);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragging ? '#eee' : '#fff',
      }}
    >
      {isDragging ? (
        <p>Drop files here...</p>
      ) : (
        <>
          <p>Drag and drop files here or click to select</p>
          <input
            type="file"
            id="file-input"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept={accept}
            webkitdirectory
            mozdirectory
          />
          <label htmlFor="file-input">Choose files</label>
        </>
      )}
    </div>
  );
};

export default FileUploader;
/*


function Accept(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

<Accept />

Below is an example of how to implement a file dropzone using Material UI and the react-dropzone library.

This example utilizes the useDropzone hook from react-dropzone to manage the drag and drop functionality. The getRootProps and getInputProps functions are used to apply the necessary props to the Box and input elements, respectively. The isDragActive boolean is used to provide visual feedback to the user when they are dragging files over the dropzone.

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

function FileDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #1976d2',
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop files here...</Typography>
      ) : (
        <Typography variant="body1">
          Drag and drop files here, or click to select files
        </Typography>
      )}
    </Box>
  );
}

export default FileDropzone;

*/