
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Code, Loader2, Bot, Key, Info, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { Input } from '@/components/ui/input';
import { 
  callGroqAPI, 
  GroqMessage,
  saveApiKey,
  getApiKey,
  clearApiKey
} from '@/utils/groq-api';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [apiKey, setApiKey] = useState(() => getApiKey() || '');
  const [showApiInput, setShowApiInput] = useState(!apiKey);
  const [showKeyInfo, setShowKeyInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

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
    
    if (apiKey) {
      try {
        // Format messages for Groq API
        const groqMessages: GroqMessage[] = [
          {
            role: 'system',
            content: 'You are a helpful AI coding assistant. Provide clear, concise, and accurate responses to programming and technical questions. Focus on practical solutions and best practices.'
          }
        ];
        
        // Add conversation history (limit to last 10 messages to keep context size reasonable)
        const conversationHistory = [...messages, userMessage].slice(-10);
        conversationHistory.forEach(msg => {
          groqMessages.push({
            role: msg.role,
            content: msg.content
          });
        });

        // Call Groq API
        const response = await callGroqAPI(groqMessages);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        // Show error in chat
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Error: ${error instanceof Error ? error.message : 'Failed to get response from Groq API'}. Please check your API key and try again.`,
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        toast({
          title: "API Error",
          description: "Failed to communicate with Groq API. Please check your API key.",
          variant: "destructive"
        });
        
        // Show API key input if there's an authentication error
        if (error instanceof Error && error.message.includes('API key')) {
          setShowApiInput(true);
          setApiKey('');
          clearApiKey();
        }
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Fallback to mock responses if no API key is provided
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I notice you haven't set up your Groq API key yet. To get the full AI experience, please click the 'Set API Key' button above and enter your key from the Groq console.",
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setShowApiInput(true);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleKeySubmit();
    }
  };
  
  const handleKeySubmit = () => {
    if (showApiInput) {
      handleSaveApiKey();
    } else {
      handleSendMessage();
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setShowApiInput(false);
      toast({
        title: "API Key Saved",
        description: "Your Groq API key has been saved locally. It will only be stored in your browser."
      });
      
      // Add assistant message confirming API key was set
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: "Great! Your Groq API key has been set. Now you can ask me any coding or programming questions, and I'll provide more accurate and helpful responses.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      toast({
        title: "Empty API Key",
        description: "Please enter a valid API key or cancel to continue without one.",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleApiKeyInput = () => {
    setShowApiInput(!showApiInput);
  };

  return (
    <div className="border rounded-md shadow-sm bg-card h-[calc(100vh-14rem)] flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">AI Coding Assistant</h3>
          <p className="text-xs text-muted-foreground">Powered by Groq LLMs</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleApiKeyInput} 
          className="gap-1"
        >
          <Key className="h-3.5 w-3.5" />
          {apiKey ? "Change API Key" : "Set API Key"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowKeyInfo(!showKeyInfo)}
          className="h-8 w-8"
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>
      
      {showKeyInfo && (
        <Alert className="m-4 mb-0">
          <div className="flex justify-between items-start">
            <AlertDescription className="text-sm mt-1">
              To get a Groq API key, create an account at <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="underline font-medium">console.groq.com</a> and generate a key. 
              Your key is stored locally in your browser and never sent to our servers.
            </AlertDescription>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2" onClick={() => setShowKeyInfo(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}
      
      {showApiInput && (
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Groq API key..."
              className="flex-1"
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Button 
              onClick={handleSaveApiKey}
              size="sm"
            >
              Save
            </Button>
            <Button 
              onClick={() => {
                setShowApiInput(false);
                setApiKey(getApiKey() || '');
              }}
              variant="ghost"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
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
            disabled={isProcessing || showApiInput}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={!input.trim() || isProcessing || showApiInput}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            {apiKey ? "Using Groq's LLama-3 8B model" : "API key required for full functionality"}
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
