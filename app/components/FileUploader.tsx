import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '/Users/rahul/WebstormProjects/ai-resume-analyzer/app/lib/utlis'; // ✅ Import formatSize

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0] || null;
      setFile(newFile);
      onFileSelect?.(newFile);
      console.log(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          

          {file ? (

          <div className= " uploader-selected-file " onClick = {(e)=> e.stopPropagation()}>
              
          <img src = "/images/pdf.png" alt ="pdf" className ="size-10"/>

            <div className=" flex items-centre space-x-3">
                    <div> 
                      <p className="text-sm  font-medium text-grey-700 truncate max-w-xs">
                          {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                           {formatSize(file.size)} {/* ✅ Show formatted size */}
                      </p>  
                 </div>

              
                 </div>
                 <button className= "p-2 cueser-pointer" onClick={(e)=> {
                    onFileSelect?.(null)
                 }}> 
                    <img  src = "/icons/cross.svg" alt="remove" className= "w-4 h-4"/> 
                    </button>  
            </div>
               ) : (
                 <div>  
                     <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                         <img src="/icons/info.svg" alt="upload" className="size-20" />
                      </div>
                   <p className="text-lg text-gray-500">
                     <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-lg text-gray-500">
                           PDF (max {formatSize(MAX_FILE_SIZE)})
                    </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
