
import { useState, useRef } from 'react';
import { Upload, Camera, Ship, Waves } from 'lucide-react';
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
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer virgin-shimmer ${
        isDragOver 
          ? 'border-primary bg-primary/10 shadow-lg scale-[1.02]' 
          : 'border-border bg-background/50 hover:border-primary hover:bg-primary/5 hover:shadow-md'
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
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full virgin-gradient opacity-20"></div>
          <Upload className="h-8 w-8 text-primary relative z-10" />
        </div>
        
        <div>
          <p className="text-lg font-medium text-card-foreground flex items-center justify-center gap-2">
            <Ship className="h-4 w-4 text-primary" />
            Drop your Virgin Voyage photo here
            <Waves className="h-4 w-4 text-primary" />
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse • JPG, PNG, GIF up to 10MB
          </p>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          <Camera className="mr-2 h-4 w-4" />
          Choose Your Virgin Memory
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
