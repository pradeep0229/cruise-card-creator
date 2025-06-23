
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-primary bg-primary/5 scale-105'
          : 'border-border hover:border-primary hover:bg-primary/5'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-primary animate-bounce" />
          ) : (
            <ImageIcon className="h-8 w-8 text-primary" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-card-foreground">
            {isDragActive ? 'Drop your image here!' : 'Upload Travel Photo'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Drag & drop or click to select
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
