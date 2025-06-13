
import { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 ${
        isDragOver 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 bg-gray-50/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-blue-600" />
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drop your image here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supports JPG, PNG, GIF up to 10MB
          </p>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 border-blue-300 text-blue-600 hover:bg-blue-50"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          <Camera className="mr-2 h-4 w-4" />
          Choose File
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
