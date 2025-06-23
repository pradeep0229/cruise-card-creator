
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
      <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm ocean-shimmer relative overflow-hidden h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
        <CardContent className="p-12 relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-cyan/20 animate-pulse"></div>
              <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-card-foreground mb-4 flex items-center justify-center gap-3">
                <Ship className="h-7 w-7 text-primary" />
                Your Voyage is Being Crafted...
                <Anchor className="h-7 w-7 text-primary" />
              </h3>
              <p className="text-xl text-muted-foreground">
                Our AI captain is navigating through your memories
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Waves className="h-6 w-6 text-primary animate-bounce" />
              <Waves className="h-6 w-6 text-primary animate-bounce delay-200" />
              <Waves className="h-6 w-6 text-primary animate-bounce delay-400" />
            </div>
            <div className="w-full max-w-lg bg-muted rounded-full h-4 overflow-hidden">
              <div className="voyage-gradient h-4 rounded-full animate-pulse w-3/4 relative">
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
        <CardHeader className="text-center pb-6 relative z-10">
          <CardTitle className="text-3xl text-card-foreground flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-yellow-500" />
            Your Voyage Postcard
            <Compass className="h-8 w-8 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          <div className="relative">
            <img
              src={generatedPostcard}
              alt="Generated Postcard"
              className="w-full h-[60vh] lg:h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6" />
                <span className="text-2xl font-medium">
                  {getDestinationLabel(selectedDestination)}
                </span>
              </div>
              <p className="text-lg opacity-90 line-clamp-4 max-w-4xl">
                {textPrompt}
              </p>
            </div>
            <div className="absolute top-8 right-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Ship className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-r from-primary/5 to-cyan/5">
            <p className="text-center text-muted-foreground text-lg flex items-center justify-center gap-3">
              <Anchor className="h-5 w-5 text-primary" />
              ✨ Crafted with AI • Ready to share your voyage!
              <Waves className="h-5 w-5 text-primary" />
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm ocean-shimmer relative overflow-hidden h-96">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/10"></div>
      <CardContent className="p-12 relative z-10 h-full flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-cyan/10"></div>
            <Sparkles className="h-12 w-12 text-muted-foreground relative z-10" />
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-card-foreground mb-4 flex items-center justify-center gap-3">
              <Ship className="h-7 w-7 text-primary" />
              Your Postcard Preview
              <Compass className="h-7 w-7 text-primary" />
            </h3>
            <p className="text-xl text-muted-foreground">
              Chart your course and create your AI-powered voyage memory
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <Anchor className="h-8 w-8" />
            <Waves className="h-8 w-8" />
            <Ship className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostcardPreview;
