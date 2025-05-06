
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, HelpCircle, AlertTriangle, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { OllamaService } from '@/services/OllamaService';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormValues {
  companyName: string;
  question: string;
}

interface WebScrapingFormValues {
  websiteUrl: string;
  question: string;
}

export default function NLP() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system', content: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      companyName: '',
      question: ''
    }
  });

  const webScrapingForm = useForm<WebScrapingFormValues>({
    defaultValues: {
      websiteUrl: '',
      question: ''
    }
  });

  useEffect(() => {
    checkConnection();
    fetchModels();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkConnection = async () => {
    try {
      setConnectionStatus('checking');
      await OllamaService.getAvailableModels();
      setConnectionStatus('connected');
      toast.success('Connected to Ollama server');
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      setConnectionStatus('disconnected');
      toast.error('Failed to connect to Ollama. Make sure the server is running at 127.0.0.1:11434');
    }
  };

  const fetchModels = async () => {
    try {
      const models = await OllamaService.getAvailableModels();
      setAvailableModels(models);
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    } catch (error) {
      console.error('Error fetching available models:', error);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || isGenerating) return;
    
    const userMessage = { role: 'user' as const, content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    
    setIsGenerating(true);
    
    // Add an empty assistant message that will be updated as the response streams in
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    try {
      await OllamaService.generateText(
        selectedModel,
        prompt,
        (chunk) => {
          // Update the last message with the new chunk
          setMessages(prev => {
            const updatedMessages = [...prev];
            const lastMsg = updatedMessages[updatedMessages.length - 1];
            if (lastMsg.role === 'assistant') {
              lastMsg.content += chunk;
            }
            return updatedMessages;
          });
        }
      );
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      toast.error('Failed to generate response from Ollama. Is the server running?');
      // Remove the empty assistant message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompanyAnalysis = async (data: FormValues) => {
    const { companyName, question } = data;
    
    // Create a prompt about the company
    const analysisPrompt = question 
      ? `${question} about ${companyName}`
      : `Tell me about ${companyName}'s sustainability initiatives, ESG metrics, and green projects. What are they doing for environmental sustainability?`;
    
    setPrompt(analysisPrompt);
    
    // Submit the form to generate a response
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(syntheticEvent);
  };

  const handleWebScraping = async (data: WebScrapingFormValues) => {
    const { websiteUrl, question } = data;
    
    if (!websiteUrl.trim()) {
      toast.error("Please enter a website URL to analyze");
      return;
    }
    
    if (isGenerating) return;
    
    // Create a user message to show what we're analyzing
    const userMessage = { 
      role: 'user' as const, 
      content: `Analyze website: ${websiteUrl}\nQuestion: ${question || 'What are their sustainability initiatives?'}` 
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsGenerating(true);
    
    // Add an empty assistant message that will be updated as the response streams in
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    try {
      await OllamaService.webScrapAndAnalyze(
        selectedModel,
        websiteUrl,
        question,
        (chunk) => {
          // Pipeline: Update the UI with each chunk as it arrives
          setMessages(prev => {
            const updatedMessages = [...prev];
            const lastMsg = updatedMessages[updatedMessages.length - 1];
            if (lastMsg.role === 'assistant') {
              lastMsg.content += chunk;
            }
            return updatedMessages;
          });
        }
      );
      toast.success('Website analysis complete');
    } catch (error) {
      console.error('Error analyzing website:', error);
      toast.error('Failed to analyze website. Is the Ollama server running?');
      // Remove the empty assistant message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsGenerating(false);
      webScrapingForm.reset(); // Reset the form after submission
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">NLP with Ollama</h1>
          <p className="text-muted-foreground">
            Ask questions and analyze companies using Ollama AI
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {connectionStatus === 'checking' && (
            <div className="flex items-center text-amber-500">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking connection...
            </div>
          )}
          {connectionStatus === 'connected' && (
            <div className="flex items-center text-green-500">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              Connected to Ollama
            </div>
          )}
          {connectionStatus === 'disconnected' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={checkConnection}
              className="flex items-center text-red-500"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Reconnect to Ollama
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Ollama AI Tools</CardTitle>
            <CardDescription>
              Analyze companies or websites using Ollama AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="company" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="company">Company Analysis</TabsTrigger>
                <TabsTrigger value="website">Web Scraping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCompanyAnalysis)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Tesla, Apple, Microsoft" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the name of the company you want to analyze
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Question (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What are their sustainability initiatives?"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Ask a specific question or leave blank for a general analysis
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between items-center pt-2">
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableModels.length > 0 ? (
                            availableModels.map(model => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="llama3">llama3</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      
                      <Button type="submit" disabled={isGenerating || connectionStatus !== 'connected'}>
                        Analyze Company
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="website" className="space-y-4">
                <Form {...webScrapingForm}>
                  <form onSubmit={webScrapingForm.handleSubmit(handleWebScraping)} className="space-y-4">
                    <FormField
                      control={webScrapingForm.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.example.com" 
                              {...field} 
                              type="url"
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the URL of the website you want to analyze
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={webScrapingForm.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Question (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What are their sustainability initiatives?"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Ask a specific question or leave blank for a general analysis
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between items-center pt-2">
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableModels.length > 0 ? (
                            availableModels.map(model => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="llama3">llama3</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        type="submit" 
                        disabled={isGenerating || connectionStatus !== 'connected'}
                        className="gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        Analyze Website
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Chat</CardTitle>
              <CardDescription>
                Ask questions and get responses from Ollama
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearConversation} 
              title="Clear conversation"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="border rounded-md h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Bot className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Start a conversation with Ollama</p>
                    <p className="text-sm">Ask anything or analyze a company</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user' 
                              ? 'bg-ecofinex-primary text-white' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>
                )}
              </div>
              
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isGenerating || connectionStatus !== 'connected'}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isGenerating || !prompt.trim() || connectionStatus !== 'connected'}>
                    {isGenerating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">Send</span>
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {connectionStatus === 'disconnected' && (
        <Card className="border-red-300 bg-red-50 text-red-800">
          <CardContent className="p-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <div>
              <p className="font-medium">Ollama server not detected</p>
              <p className="text-sm">Make sure Ollama is running at 127.0.0.1:11434. Start the server and click "Reconnect to Ollama" above.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
