
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Sparkles, Ship, Anchor, Waves, Compass } from 'lucide-react';

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
      'caribbean': '🏝️ Caribbean',
      'alaska': '🏔️ Alaska',
      'mediterranean': '🏛️ Mediterranean',
      'hawaii': '🌺 Hawaii',
      'northern-europe': '🏰 Northern Europe',
      'asia': '🏯 Asia',
      'south-america': '🗿 South America',
    };
    return destinations[value as keyof typeof destinations] || value;
  };

  if (isLoading) {
    return (
      <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm ocean-shimmer relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
        <CardContent className="p-12 relative z-10">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-cyan/20 animate-pulse"></div>
              <Loader2 className="h-10 w-10 text-primary animate-spin relative z-10" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                <Ship className="h-5 w-5 text-primary" />
                Your Voyage is Being Crafted...
                <Anchor className="h-5 w-5 text-primary" />
              </h3>
              <p className="text-muted-foreground">
                Our AI captain is navigating through your memories
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Waves className="h-4 w-4 text-primary animate-bounce" />
              <Waves className="h-4 w-4 text-primary animate-bounce delay-200" />
              <Waves className="h-4 w-4 text-primary animate-bounce delay-400" />
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div className="voyage-gradient h-3 rounded-full animate-pulse w-3/4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (generatedPostcard) {
    return (
      <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm overflow-hidden ocean-shimmer relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Your Voyage Postcard
            <Compass className="h-6 w-6 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          <div className="relative">
            <img
              src={generatedPostcard}
              alt="Generated Postcard"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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
            <div className="absolute top-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Ship className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-primary/5 to-cyan/5">
            <p className="text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
              <Anchor className="h-4 w-4 text-primary" />
              ✨ Crafted with AI • Ready to share your voyage!
              <Waves className="h-4 w-4 text-primary" />
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm ocean-shimmer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
      <CardContent className="p-12 relative z-10">
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-cyan/10"></div>
            <Sparkles className="h-10 w-10 text-muted-foreground relative z-10" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
              <Ship className="h-5 w-5 text-primary" />
              Your Postcard Preview
              <Compass className="h-5 w-5 text-primary" />
            </h3>
            <p className="text-muted-foreground">
              Chart your course and create your AI-powered voyage memory
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <Anchor className="h-6 w-6" />
            <Waves className="h-6 w-6" />
            <Ship className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostcardPreview;
