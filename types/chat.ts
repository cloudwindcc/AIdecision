export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
  error?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  decisionContext?: DecisionContext;
}

export interface DecisionContext {
  type: DecisionType;
  urgency: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  factors: string[];
  constraints: string[];
  timeline?: string;
}

export type DecisionType = 
  | 'career'
  | 'financial'
  | 'relationship'
  | 'health'
  | 'education'
  | 'business'
  | 'lifestyle'
  | 'other';

export interface ChatRequest {
  message: string;
  history: Message[];
  decisionContext?: DecisionContext;
}

export interface ChatResponse {
  message: string;
  analysis?: DecisionAnalysis;
}

export interface DecisionAnalysis {
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  alternatives: {
    option: string;
    pros: string[];
    cons: string[];
    risk: 'low' | 'medium' | 'high';
  }[];
  recommendation: {
    choice: string;
    confidence: number;
    reason: string;
    actionSteps: string[];
  };
  timeline?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}