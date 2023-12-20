import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFileUpload }) => {
  const onDrop = acceptedFiles => {
    onFileUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }} className='mt-12'>
      <input {...getInputProps()} />
      <p className='text-black'>Arrastra y suelta un archivo MP3 aquí, o haz clic para seleccionar uno.</p>
    </div>
  );
};

export default FileUploader;
