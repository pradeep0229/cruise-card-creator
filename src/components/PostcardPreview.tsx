
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Sparkles } from 'lucide-react';

interface PostcardPreviewProps {
  generatedPostcard: string;
  isLoading: boolean;
  selectedDestination: string;
  textPrompt: string;
}

const PostcardPreview = ({ 
  generatedPostcard, 
  isLoading, 
  selectedDestination, 
  textPrompt 
}: PostcardPreviewProps) => {
  const getDestinationLabel = (value: string) => {
    const destinations = {
      'caribbean': 'Caribbean',
      'alaska': 'Alaska',
      'mediterranean': 'Mediterranean',
      'hawaii': 'Hawaii',
      'northern-europe': 'Northern Europe',
      'asia': 'Asia',
      'south-america': 'South America',
    };
    return destinations[value as keyof typeof destinations] || value;
  };

  if (isLoading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Creating Your Postcard...
              </h3>
              <p className="text-gray-600">
                Our AI is crafting something beautiful for you
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (generatedPostcard) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Your AI Postcard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={generatedPostcard}
              alt="Generated Postcard"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {getDestinationLabel(selectedDestination)}
                </span>
              </div>
              <p className="text-sm opacity-90 line-clamp-2">
                {textPrompt}
              </p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-center text-gray-600 text-sm">
              ✨ Generated with AI • Ready to share!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-12">
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Postcard Preview
            </h3>
            <p className="text-gray-600">
              Fill out the form to generate your AI-powered postcard
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostcardPreview;
