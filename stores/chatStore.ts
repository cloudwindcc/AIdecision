import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatSession, Message, DecisionContext } from '@/types/chat';
import { generateId } from '@/lib/utils';

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isLoading: boolean;
  
  // Actions
  createSession: (title?: string) => string;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (sessionId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) => void;
  deleteSession: (sessionId: string) => void;
  clearSessions: () => void;
  setLoading: (loading: boolean) => void;
  getCurrentSession: () => ChatSession | undefined;
  getSessionMessages: (sessionId: string) => Message[];
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      isLoading: false,

      createSession: (title = '新对话') => {
        const newSession: ChatSession = {
          id: generateId(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));

        return newSession.id;
      },

      setCurrentSession: (sessionId) => {
        set({ currentSessionId: sessionId });
      },

      addMessage: (sessionId, message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: new Date(),
        };

        set((state) => ({
          sessions: state.sessions.map((session) => {
            if (session.id === sessionId) {
              const updatedMessages = [...session.messages, newMessage];
              return {
                ...session,
                messages: updatedMessages,
                updatedAt: new Date(),
                title: session.messages.length === 0 
                  ? newMessage.content.substring(0, 30) + '...'
                  : session.title,
              };
            }
            return session;
          }),
        }));
      },

      updateMessage: (sessionId, messageId, updates) => {
        set((state) => ({
          sessions: state.sessions.map((session) => {
            if (session.id === sessionId) {
              return {
                ...session,
                messages: session.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, ...updates } : msg
                ),
                updatedAt: new Date(),
              };
            }
            return session;
          }),
        }));
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== sessionId);
          const newCurrentId = state.currentSessionId === sessionId 
            ? (newSessions[0]?.id || null)
            : state.currentSessionId;
          
          return {
            sessions: newSessions,
            currentSessionId: newCurrentId,
          };
        });
      },

      clearSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId);
      },

      getSessionMessages: (sessionId) => {
        const state = get();
        const session = state.sessions.find((s) => s.id === sessionId);
        return session?.messages || [];
      },
    }),
    {
      name: 'chat-store',
      version: 1,
    }
  )
);