
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Loader2, Camera, Send, Anchor, Ship, Waves } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import PostcardPreview from '@/components/PostcardPreview';

const cruiseDestinations = [
  { value: 'caribbean', label: '🏝️ Caribbean' },
  { value: 'alaska', label: '🏔️ Alaska' },
  { value: 'mediterranean', label: '🏛️ Mediterranean' },
  { value: 'hawaii', label: '🌺 Hawaii' },
  { value: 'northern-europe', label: '🏰 Northern Europe' },
  { value: 'asia', label: '🏯 Asia' },
  { value: 'south-america', label: '🗿 South America' },
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-25 to-rose-50 virgin-pattern">
      {/* Floating Virgin Voyages elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-red-200/30 animate-bounce">
          <Anchor size={32} />
        </div>
        <div className="absolute top-40 right-20 text-pink-200/30 animate-pulse">
          <Ship size={28} />
        </div>
        <div className="absolute bottom-32 left-1/4 text-rose-200/30 animate-bounce delay-1000">
          <Waves size={24} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ship className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Postcard Voyage
            </h1>
            <Anchor className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capture your voyage memories in style! Transform your Virgin Voyage moments into stunning AI-powered postcards. 
            Upload your photo, share your story, and create something extraordinary.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-2xl border-0 virgin-card virgin-shimmer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-pink/10"></div>
            <CardHeader className="text-center pb-6 relative z-10">
              <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
                <Camera className="h-6 w-6 text-primary" />
                Create Your Virgin Voyage Memory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Ship className="h-4 w-4 text-primary" />
                    Upload Your Voyage Memory
                  </Label>
                  <ImageUpload onImageSelect={handleImageSelect} />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border-2 border-primary/20 shadow-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Text Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Waves className="h-4 w-4 text-primary" />
                    Your Voyage Story
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Tell us about your Virgin Voyage adventure... What made this moment unforgettable?"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="min-h-[100px] resize-none border-border focus:border-primary bg-background/80 backdrop-blur-sm"
                  />
                </div>

                {/* Destination Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Anchor className="h-4 w-4 text-primary" />
                    Virgin Voyage Destination
                  </Label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                    <SelectTrigger className="border-border focus:border-primary bg-background/80 backdrop-blur-sm">
                      <SelectValue placeholder="🌊 Choose your Virgin Voyage" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-xl">
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
                  className="w-full virgin-gradient hover:opacity-90 text-primary-foreground font-medium py-3 transition-all duration-300 shadow-lg hover:shadow-xl virgin-shimmer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Crafting Your Virgin Voyage Postcard...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Create My Virgin Voyage Memory
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
