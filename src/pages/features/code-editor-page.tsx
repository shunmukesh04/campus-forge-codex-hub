
import React from 'react';
import { CodeEditor } from '@/components/code-editor/editor';

const CodeEditorPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Code Editor</h1>
        <p className="text-muted-foreground">
          Write, compile, and execute code in multiple languages
        </p>
      </div>
      
      <CodeEditor />
    </div>
  );
};

export default CodeEditorPage;
