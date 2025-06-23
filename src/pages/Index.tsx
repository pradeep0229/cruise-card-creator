
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-25 to-teal-50 wave-pattern">
      {/* Floating nautical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-blue-200/30 animate-bounce">
          <Anchor size={32} />
        </div>
        <div className="absolute top-40 right-20 text-cyan-200/30 animate-pulse">
          <Ship size={28} />
        </div>
        <div className="absolute bottom-32 left-1/4 text-teal-200/30 animate-bounce delay-1000">
          <Waves size={24} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ship className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Postcard Voyage
            </h1>
            <Anchor className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Set sail on a journey of memories! Transform your travel moments into beautiful AI-powered postcards. 
            Upload an image, share your story, and let AI create something magical.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Waves className="h-4 w-4 text-primary animate-pulse" />
            <Waves className="h-4 w-4 text-primary animate-pulse delay-200" />
            <Waves className="h-4 w-4 text-primary animate-pulse delay-400" />
          </div>
        </div>

        {/* Input Form */}
        <div className="mb-12">
          <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm ocean-shimmer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
            <CardHeader className="text-center pb-6 relative z-10">
              <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
                <Camera className="h-6 w-6 text-primary" />
                Create Your Voyage Memory
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="image" className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <Ship className="h-5 w-5 text-primary" />
                      Upload Your Travel Memory
                    </Label>
                    <ImageUpload onImageSelect={handleImageSelect} />
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-primary/20 shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Text Prompt */}
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <Waves className="h-5 w-5 text-primary" />
                      Prompt for Your Postcard
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe what you want to see on your postcard... What message, scene, or feeling should be captured? Share your creative vision for the perfect postcard design."
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      className="min-h-[180px] resize-none border-2 border-border focus:border-primary bg-background/80 backdrop-blur-sm text-base p-4"
                    />
                  </div>

                  {/* Destination Dropdown */}
                  <div className="space-y-3">
                    <Label htmlFor="destination" className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <Anchor className="h-5 w-5 text-primary" />
                      Cruise Destination
                    </Label>
                    <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                      <SelectTrigger className="h-12 border-2 border-border focus:border-primary bg-background/80 backdrop-blur-sm text-base">
                        <SelectValue placeholder="🗺️ Choose your destination" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-2 border-border shadow-xl">
                        {cruiseDestinations.map((destination) => (
                          <SelectItem key={destination.value} value={destination.value} className="text-base py-3">
                            {destination.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Tip:</strong> Choose the destination that best matches your photo to get the most authentic postcard design.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6 border-t border-border/50">
                  <Button
                    type="submit"
                    disabled={isLoading || !selectedImage || !textPrompt || !selectedDestination}
                    size="lg"
                    className="px-12 py-4 h-14 nautical-gradient hover:opacity-90 text-primary-foreground font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl ocean-shimmer text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Crafting Your Voyage...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6" />
                        Set Sail & Generate Postcard
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    Your magical postcard will appear below once generated
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview/Result */}
        <div>
          <PostcardPreview 
            generatedPostcard={generatedPostcard} 
            isLoading={isLoading}
            selectedDestination={selectedDestination}
            textPrompt={textPrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
