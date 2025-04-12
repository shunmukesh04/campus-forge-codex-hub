
import React from 'react';
import { AIChat } from '@/components/ai-assistant/ai-chat';

const AIAssistantPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Coding Assistant</h1>
        <p className="text-muted-foreground">
          Get help with your programming questions and coding challenges, powered by Groq AI
        </p>
      </div>
      
      <AIChat />
    </div>
  );
};

export default AIAssistantPage;
