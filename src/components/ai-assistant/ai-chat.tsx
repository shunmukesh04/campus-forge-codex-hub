
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Code, Loader2, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI coding assistant. I can help you with programming questions, debug your code, or explain concepts. What would you like help with today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('help') || input.toLowerCase().includes('assist')) {
        response = "I'd be happy to help! Could you provide more details about what you're working on or what specific programming concept you need assistance with?";
      } else if (input.toLowerCase().includes('error') || input.toLowerCase().includes('bug')) {
        response = "I see you're encountering an issue. To help debug effectively, could you share the error message and a code snippet showing where the problem occurs?";
      } else if (input.toLowerCase().includes('explain') || input.toLowerCase().includes('what is')) {
        response = "Great question! I'll explain that concept clearly. Is there a specific aspect or use case you're interested in?";
      } else if (input.toLowerCase().includes('code') || input.toLowerCase().includes('function')) {
        response = "I can help with that code. Are you looking for a code example, optimization suggestions, or help fixing an issue?";
      } else {
        response = "Thanks for your message! I'm here to help with your coding and programming questions. Could you provide some more details about what you're working on?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="border rounded-md shadow-sm bg-card h-[calc(100vh-12rem)] flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">AI Coding Assistant</h3>
          <p className="text-xs text-muted-foreground">Your programming companion</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-3 ${message.role === 'assistant' ? '' : 'justify-end'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'assistant' 
                ? 'bg-muted text-foreground' 
                : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {message.role === 'user' && user && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
            </Avatar>
            <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      <div className="p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about code, programming concepts, or debugging help..."
            className="min-h-12 resize-none"
            disabled={isProcessing}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={!input.trim() || isProcessing}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            Powered by AI to assist with code and learning
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Code className="h-3.5 w-3.5 mr-1" />
              Insert code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
