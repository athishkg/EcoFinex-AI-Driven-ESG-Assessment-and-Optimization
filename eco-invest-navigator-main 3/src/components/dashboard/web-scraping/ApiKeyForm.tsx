
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from 'lucide-react';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface ApiKeyFormProps {
  onApiKeySet: () => void;
}

export const ApiKeyForm = ({ onApiKeySet }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    try {
      setIsLoading(true);
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast.success("API key saved successfully");
        onApiKeySet();
      } else {
        toast.error("Invalid API key");
      }
    } catch (error) {
      toast.error("Failed to verify API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
        <div>
          <h4 className="font-medium text-amber-800">API Key Required</h4>
          <p className="text-sm text-amber-700 mt-1">
            To use the web scraping feature, you need to provide a Firecrawl API key.
          </p>
          
          <div className="mt-3 flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Firecrawl API key"
              className="flex-1"
            />
            <Button 
              onClick={handleSaveApiKey}
              disabled={isLoading}
              className="whitespace-nowrap bg-amber-600 hover:bg-amber-700"
            >
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
