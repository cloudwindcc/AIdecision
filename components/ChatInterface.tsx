'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Plus, Menu, X } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn, scrollToBottom, formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ChatInterface: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    sessions,
    currentSessionId,
    isLoading,
    createSession,
    setCurrentSession,
    addMessage,
    updateMessage,
    deleteSession,
    getCurrentSession,
    getSessionMessages,
  } = useChatStore();

  const currentSession = getCurrentSession();
  const messages = currentSessionId ? getSessionMessages(currentSessionId) : [];

  useEffect(() => {
    scrollToBottom(messagesEndRef.current!);
  }, [messages]);

  useEffect(() => {
    if (!currentSessionId && sessions.length === 0) {
      createSession();
    }
  }, [currentSessionId, sessions.length, createSession]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    
    if (!currentSessionId) {
      createSession(messageText);
    }

    // Add user message
    const currentId = currentSessionId || sessions[0]?.id;
    if (currentId) {
      addMessage(currentId, {
        content: messageText,
        role: 'user',
      });

      // Show loading state
      addMessage(currentId, {
        content: '',
        role: 'assistant',
        isStreaming: true,
      });

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messageText,
            history: getSessionMessages(currentId).slice(-10), // Send last 10 messages for context
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        // Update the streaming message with actual response
        const messages = getSessionMessages(currentId);
        const streamingMessage = messages.filter(m => m.isStreaming).pop();
        if (streamingMessage) {
          updateMessage(currentId, streamingMessage.id, {
            content: data.message,
            isStreaming: false,
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const streamingMessage = getSessionMessages(currentId).filter(m => m.isStreaming).pop();
        if (streamingMessage) {
          updateMessage(currentId, streamingMessage.id, {
            content: '抱歉，我遇到了一些问题。请稍后再试。',
            isStreaming: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    createSession();
    setIsSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这个对话吗？')) {
      deleteSession(sessionId);
    }
  };

  const Sidebar = () => (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start"
            variant="primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建对话
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => {
                setCurrentSession(session.id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                session.id === currentSessionId && "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {session.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(session.updatedAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                onClick={(e) => handleDeleteSession(session.id, e)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden mr-2"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI决策助手
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewChat}
            className="hidden lg:flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            新对话
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                欢迎使用AI决策助手
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                我可以帮助你分析重要的生活决策，包括职业选择、投资理财、人际关系等。
                请分享你正在面临的具体决策问题。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {[
                  "我应该接受这个薪资更高的新工作吗？",
                  "如何制定我的投资计划？",
                  "如何处理这段复杂的人际关系？",
                  "应该选择哪个专业发展方向？"
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(example)}
                    className="text-left p-3 h-auto"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex gap-3 max-w-2xl">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <Card className={cn(
                      "flex-1",
                      message.role === 'user' 
                        ? "bg-primary-600 text-white" 
                        : "bg-white dark:bg-gray-800"
                    )}>
                      <CardContent className="p-4">
                        {message.isStreaming && !message.content ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                          </div>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ node, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                  <div className="my-2">
                                    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                      <code className={`language-${match[1]}`} {...props}>
                                        {String(children).replace(/\n$/, '')}
                                      </code>
                                    </pre>
                                  </div>
                                ) : (
                                  <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-xl font-semibold mb-2 mt-4">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3">{children}</h3>,
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary-200 pl-4 italic my-2">
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                        
                        {!message.isStreaming && (
                          <p className={cn(
                            "text-xs mt-2",
                            message.role === 'user' ? "text-primary-200" : "text-gray-500 dark:text-gray-400"
                          )}>
                            {formatDate(message.timestamp)}
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="描述你面临的决策问题..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                rows={1}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                loading={isLoading}
                className="px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              按 Enter 发送，Shift+Enter 换行
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};