import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropToBase64Image = ({ onImageDropped }) => {

  const onDrop = useCallback((acceptedFiles) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // https://developer.mozilla.org/es/docs/Web/API/WindowBase64/Base64_codificando_y_decodificando
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
        
        
        //Funcion .btoa() binario (string) to ascii
        onImageDropped(btoa(reader.result));
      }

      // https://developer.mozilla.org/es/docs/Web/API/FileReader/readAsBinaryString
      reader.readAsBinaryString(acceptedFiles[0]);
    
  }, []);  
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: '.jpeg',
    maxFiles: 1,
    onDrop
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
    <section className="containerDropzone">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta la imagen o haz click para seleccionar un fichero</p>
        <em>Sólo se acepta un único fichero en formato jpeg</em>
      </div>
      <aside>
        <h4>Fichero aceptado</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Fichero rechazado</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default DropToBase64Image;