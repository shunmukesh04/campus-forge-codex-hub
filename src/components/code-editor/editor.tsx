
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Save, Trash2, Copy, Lightbulb } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface CodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
}

export const CodeEditor = ({ 
  initialCode = '// Write your code here\n', 
  initialLanguage = 'javascript' 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
  ];

  const getBoilerplate = (lang: string) => {
    switch (lang) {
      case 'python':
        return '# Python code\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()';
      case 'java':
        return '// Java code\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
      case 'cpp':
        return '// C++ code\n\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}';
      case 'c':
        return '// C code\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
      default:
        return '// JavaScript code\n\nconsole.log("Hello, World!");';
    }
  };

  const handleLanguageChange = (value: string) => {
    if (code === initialCode || code === getBoilerplate(language)) {
      setCode(getBoilerplate(value));
    }
    setLanguage(value);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate running code
    setTimeout(() => {
      let simulatedOutput = '';
      
      // Mock execution for demo
      if (code.includes('print') || code.includes('console.log') || code.includes('System.out.println')) {
        simulatedOutput = 'Hello, World!\n';
      } else if (language === 'javascript' && code.includes('Error')) {
        simulatedOutput = 'Uncaught ReferenceError: Error is not defined\n  at <anonymous>:1:1';
      } else if (language === 'python' && code.includes('error')) {
        simulatedOutput = 'Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name \'error\' is not defined';
      } else {
        simulatedOutput = 'Program executed successfully with no output.\n';
      }
      
      if (code.includes('loop') || code.includes('while') || code.includes('for')) {
        simulatedOutput += 'Execution time: 0.032s\nMemory used: 4.2 MB\n';
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Code has been copied to clipboard",
    });
  };

  const handleClear = () => {
    setCode(getBoilerplate(language));
    setOutput('');
  };

  const handleGetHint = () => {
    const hints = {
      javascript: "Try using console.log() to debug your values!",
      python: "Check your indentation and use print() for debugging.",
      java: "Don't forget to handle exceptions and check your method signatures.",
      cpp: "Make sure your pointers are properly initialized and memory is managed.",
      c: "Check for buffer overflows and proper memory allocation."
    };
    
    toast({
      title: "Coding Hint",
      description: hints[language as keyof typeof hints] || "Try breaking down your problem into smaller steps.",
    });
  };

  return (
    <div className="border rounded-md shadow-sm bg-card overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Badge variant="outline" className="font-mono text-xs">
            {language.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGetHint}
            title="Get a hint"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Hint
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            title="Copy code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClear}
            title="Clear code"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-26rem)]">
        <Textarea
          className="min-h-[400px] font-mono p-4 text-sm resize-none rounded-none h-full"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        />
        
        <div className="border-l lg:border-t-0 border-t">
          <Tabs defaultValue="output">
            <div className="border-b">
              <TabsList className="mx-4 my-2">
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="output" className="m-0">
              <div className="p-4 bg-slate-950 text-gray-100 font-mono text-sm h-[calc(100vh-28rem)] overflow-auto">
                {isRunning ? (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Running...</span>
                  </div>
                ) : output ? (
                  <pre>{output}</pre>
                ) : (
                  <div className="text-slate-400">Run your code to see output here</div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="console" className="m-0">
              <div className="p-4 bg-slate-950 text-gray-100 font-mono text-sm h-[calc(100vh-28rem)] overflow-auto">
                <div className="text-slate-400">Console logs will appear here</div>
              </div>
            </TabsContent>
            
            <TabsContent value="tests" className="m-0">
              <div className="p-4 font-mono text-sm h-[calc(100vh-28rem)] overflow-auto">
                <div className="mb-4">
                  <div className="font-medium mb-2">Test Cases</div>
                  <div className="space-y-2">
                    <div className="p-2 border rounded bg-muted/30 flex justify-between">
                      <span>Basic test case</span>
                      <Badge variant="outline">Not run</Badge>
                    </div>
                    <div className="p-2 border rounded bg-muted/30 flex justify-between">
                      <span>Edge cases</span>
                      <Badge variant="outline">Not run</Badge>
                    </div>
                    <div className="p-2 border rounded bg-muted/30 flex justify-between">
                      <span>Performance test</span>
                      <Badge variant="outline">Not run</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
