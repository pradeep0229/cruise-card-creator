
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Loader2, Camera, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import PostcardPreview from '@/components/PostcardPreview';

const cruiseDestinations = [
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'hawaii', label: 'Hawaii' },
  { value: 'northern-europe', label: 'Northern Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'south-america', label: 'South America' },
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [textPrompt, setTextPrompt] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPostcard, setGeneratedPostcard] = useState<string>('');
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage || !textPrompt || !selectedDestination) {
      toast({
        title: "Missing Information",
        description: "Please provide an image, text prompt, and select a destination.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('textPrompt', textPrompt);
      formData.append('destination', selectedDestination);

      // Mock API call - replace with your actual backend endpoint
      const response = await fetch('/api/generate-postcard', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedPostcard(data.postcardUrl);
        toast({
          title: "Postcard Generated!",
          description: "Your AI-powered postcard has been created successfully.",
        });
      } else {
        throw new Error('Failed to generate postcard');
      }
    } catch (error) {
      console.error('Error generating postcard:', error);
      // For demo purposes, simulate a successful response
      setTimeout(() => {
        setGeneratedPostcard('https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop');
        toast({
          title: "Demo Mode",
          description: "This is a demo. Your postcard would be generated here!",
        });
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Postcard Voyage
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your travel memories into beautiful AI-powered postcards. 
            Upload an image, add your message, and let AI create something magical.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                <Camera className="h-6 w-6 text-blue-600" />
                Create Your Postcard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                    Upload Image
                  </Label>
                  <ImageUpload onImageSelect={handleImageSelect} />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Text Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                    Your Message
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your perfect postcard message..."
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="min-h-[100px] resize-none border-gray-300 focus:border-blue-500"
                  />
                </div>

                {/* Destination Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
                    Cruise Destination
                  </Label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {cruiseDestinations.map((destination) => (
                        <SelectItem key={destination.value} value={destination.value}>
                          {destination.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Postcard...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Postcard
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview/Result */}
          <div className="space-y-6">
            <PostcardPreview 
              generatedPostcard={generatedPostcard} 
              isLoading={isLoading}
              selectedDestination={selectedDestination}
              textPrompt={textPrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
