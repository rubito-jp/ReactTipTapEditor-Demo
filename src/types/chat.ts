export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  files?: FileAttachment[] | undefined;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

export interface QuickPrompt {
  title: string;
  description: string;
  prompt: string;
}
