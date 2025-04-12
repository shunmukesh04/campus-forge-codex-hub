
import React from 'react';
import { AIChat } from '@/components/ai-assistant/ai-chat';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIAssistantPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Coding Assistant</h1>
        <p className="text-muted-foreground">
          Get help with your programming questions and coding challenges, powered by Groq AI
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open('https://console.groq.com/keys', '_blank')}
            className="flex items-center gap-1"
          >
            Get Groq API Key <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          <span className="text-xs text-muted-foreground">
            Required for advanced AI capabilities
          </span>
        </div>
      </div>
      
      <AIChat />
    </div>
  );
};

export default AIAssistantPage;
