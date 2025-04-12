
export interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GroqResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
}

// We'll store this key in localStorage for convenience in this frontend-only implementation
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('groq_api_key', apiKey);
};

export const getApiKey = (): string | null => {
  return localStorage.getItem('groq_api_key');
};

export const clearApiKey = (): void => {
  localStorage.removeItem('groq_api_key');
};

export const callGroqAPI = async (
  messages: GroqMessage[]
): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API key not found. Please set your Groq API key first.');
  }
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to call Groq API');
    }

    const data: GroqResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
};
