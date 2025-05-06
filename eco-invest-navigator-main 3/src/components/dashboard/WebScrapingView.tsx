
import React, { useState, useEffect } from 'react';
import { Globe, Search, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { ApiKeyForm } from './web-scraping/ApiKeyForm';
import { CompanySourceTabs } from './web-scraping/CompanySourceTabs';
import { LoadingProgress } from './web-scraping/LoadingProgress';
import { InitiativeFinder } from './web-scraping/InitiativeFinder';
import { extractGreenInitiatives } from './web-scraping/helpers/extractGreenInitiatives';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

interface WebScrapingViewProps {
  onCompanyDataFetched?: (data: any) => void;
  companyName?: string;
}

interface CompanySearchFormValues {
  companyName: string;
}

export const WebScrapingView = ({ onCompanyDataFetched, companyName: initialCompanyName }: WebScrapingViewProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("company-website");
  const [companyLinks, setCompanyLinks] = useState<{website?: string; news?: string[]; social?: string[]}>({});
  const [companyName, setCompanyName] = useState(initialCompanyName || '');
  const hasApiKey = !!FirecrawlService.getApiKey();
  
  const form = useForm<CompanySearchFormValues>({
    defaultValues: {
      companyName: initialCompanyName || '',
    },
  });
  
  // Effect to search for company URLs when company name changes
  useEffect(() => {
    if (companyName && companyName.trim() !== '') {
      findCompanyUrls(companyName);
    }
  }, [companyName]);
  
  // Effect to initialize form with companyName when it changes
  useEffect(() => {
    if (initialCompanyName) {
      form.setValue('companyName', initialCompanyName);
      setCompanyName(initialCompanyName);
    }
  }, [initialCompanyName, form]);

  const findCompanyUrls = async (company: string) => {
    setCompanyLinks({});
    
    try {
      toast.info(`Searching for information about ${company}...`);
      
      // Simulate searching for company URLs
      // In a real implementation, this might use a search API or web scraping
      const companySlug = company.toLowerCase().replace(/\s+/g, '-');
      const companyNoSpace = company.toLowerCase().replace(/\s+/g, '');
      
      const mockSearchResults = {
        website: `https://${companyNoSpace}.com`,
        news: [
          `https://economictimes.indiatimes.com/company/${companySlug}`,
          `https://www.business-standard.com/company/${companySlug}`,
        ],
        social: [
          `https://twitter.com/${companyNoSpace}`,
          `https://www.linkedin.com/company/${companySlug}`
        ]
      };
      
      setCompanyLinks(mockSearchResults);
      setUrl(mockSearchResults.website);
      toast.success(`Found information about ${company}`);
      
      // If the API key is already set, automatically start crawling the company website
      if (FirecrawlService.getApiKey()) {
        toast.info(`Starting analysis of ${company}...`);
        setTimeout(() => {
          handleSubmit(new Event('auto') as unknown as React.FormEvent);
        }, 500);
      }
    } catch (error) {
      console.error('Error finding company URLs:', error);
      toast.error(`Could not find information about ${company}`);
    }
  };

  const handleApiKeySet = () => {
    // If we have a company name and URL, automatically start crawling
    if (url && companyName) {
      handleSubmit(new Event('auto') as unknown as React.FormEvent);
    }
  };
  
  const onSearchCompany = (data: CompanySearchFormValues) => {
    const newCompanyName = data.companyName.trim();
    if (newCompanyName && newCompanyName !== companyName) {
      setCompanyName(newCompanyName);
      setCrawlResult(null);
      setSelectedText(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a URL to scrape");
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    setSelectedText(null);
    
    try {
      const apiKey = FirecrawlService.getApiKey();
      if (!apiKey) {
        toast.error("Please set your API key first");
        return;
      }

      console.log('Starting crawl for URL:', url);
      
      // Update progress as we go
      let progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);

      const result = await FirecrawlService.crawlWebsite(url);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (result.success) {
        toast.success("Website crawled successfully");
        setCrawlResult(result.data);
        
        // Pass the data back to the parent component
        if (onCompanyDataFetched && result.data) {
          onCompanyDataFetched(result.data);
        }
      } else {
        toast.error(result.error || "Failed to crawl website");
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast.error("Failed to crawl website");
    } finally {
      setIsLoading(false);
    }
  };

  const greenInitiatives = crawlResult ? extractGreenInitiatives(crawlResult, url) : [];

  return (
    <Card className="p-6 border-l-4 border-l-ecofinex-tertiary">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-ecofinex-tertiary" />
          EcoFinex Web Scraping Tool
        </CardTitle>
        <CardDescription>
          Discover green initiatives by scraping company websites
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 pt-4 pb-0 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearchCompany)} className="flex flex-col sm:flex-row gap-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input 
                        placeholder="Enter company name (e.g. Tesla, Apple)" 
                        {...field} 
                        autoComplete="off"
                      />
                    </FormControl>
                    <Button type="submit" className="gap-2">
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        {!hasApiKey && (
          <ApiKeyForm onApiKeySet={handleApiKeySet} />
        )}
        
        {companyLinks.website && (
          <CompanySourceTabs 
            url={url}
            setUrl={setUrl}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            companyLinks={companyLinks}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
        
        {isLoading && <LoadingProgress progress={progress} />}
        
        <InitiativeFinder 
          greenInitiatives={greenInitiatives}
          companyName={companyName}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
          onCompanyDataFetched={onCompanyDataFetched}
          hasApiKey={hasApiKey}
          url={url}
        />
      </CardContent>
      
      {!companyName && !isLoading && (
        <CardFooter className="px-0 pt-4">
          <div className="w-full flex items-center justify-center p-8 text-muted-foreground">
            <div className="text-center">
              <Search className="mx-auto h-12 w-12 opacity-50 mb-2" />
              <p className="text-lg font-medium">Search for a company to get started</p>
              <p className="text-sm">Enter a company name above to analyze their sustainability initiatives</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
