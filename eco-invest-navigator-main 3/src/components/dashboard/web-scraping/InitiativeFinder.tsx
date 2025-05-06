
import React from 'react';
import { FileText, Link, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GreenInitiative {
  text: string;
  url: string;
  score: number;
}

interface InitiativeFinderProps {
  greenInitiatives: GreenInitiative[];
  companyName?: string;
  selectedText: string | null;
  setSelectedText: (text: string | null) => void;
  onCompanyDataFetched?: (data: any) => void;
  hasApiKey: boolean;
  url: string;
}

export const InitiativeFinder = ({
  greenInitiatives,
  companyName,
  selectedText,
  setSelectedText,
  onCompanyDataFetched,
  hasApiKey,
  url
}: InitiativeFinderProps) => {
  if (greenInitiatives.length > 0) {
    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FileText className="h-5 w-5 mr-2 text-ecofinex-tertiary" />
          Green Initiative Findings
        </h3>
        
        <div className="space-y-4">
          {greenInitiatives.slice(0, 5).map((initiative, idx) => (
            <div 
              key={idx} 
              className={`p-3 border rounded-md transition-all cursor-pointer ${
                selectedText === initiative.text 
                  ? 'bg-slate-100 border-ecofinex-tertiary' 
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => {
                setSelectedText(initiative.text);
                if (onCompanyDataFetched) {
                  onCompanyDataFetched({
                    project: initiative.text.substring(0, 150) + (initiative.text.length > 150 ? '...' : ''),
                    source: initiative.url,
                    date: new Date().toLocaleDateString(),
                    description: initiative.text
                  });
                }
              }}
            >
              <div className="text-sm line-clamp-3">
                {initiative.text}
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge className="bg-ecofinex-light text-ecofinex-tertiary flex items-center gap-1">
                  <Link className="h-3 w-3" />
                  <span>{new URL(initiative.url).hostname}</span>
                </Badge>
                <span className="text-xs text-gray-500">Relevance: {initiative.score}</span>
              </div>
            </div>
          ))}
        </div>
        
        {selectedText && (
          <div className="p-4 border rounded-md bg-slate-50">
            <h4 className="font-medium text-sm mb-2">Selected Initiative</h4>
            <p className="text-sm">{selectedText}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                if (onCompanyDataFetched) {
                  onCompanyDataFetched({
                    project: selectedText.substring(0, 150) + (selectedText.length > 150 ? '...' : ''),
                    source: greenInitiatives.find(i => i.text === selectedText)?.url || url,
                    date: new Date().toLocaleDateString(),
                    description: selectedText
                  });
                }
                toast.success("Initiative selected for analysis");
              }}
            >
              Use This Initiative
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  if (companyName && !greenInitiatives.length) {
    return (
      <div className="p-4 border rounded-md bg-slate-50 text-center">
        <Info className="h-5 w-5 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">
          {hasApiKey 
            ? "Click the Scrape button to analyze the company's green initiatives." 
            : "Enter your Firecrawl API key to automatically analyze this company's green initiatives."}
        </p>
      </div>
    );
  }
  
  return null;
};
