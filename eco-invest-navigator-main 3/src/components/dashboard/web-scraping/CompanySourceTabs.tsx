
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Newspaper, Link } from 'lucide-react';

interface CompanyLinksProps {
  website?: string;
  news?: string[];
  social?: string[];
}

interface CompanySourceTabsProps {
  url: string;
  setUrl: (url: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  companyLinks: CompanyLinksProps;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const CompanySourceTabs = ({
  url,
  setUrl,
  activeTab,
  setActiveTab,
  companyLinks,
  onSubmit,
  isLoading
}: CompanySourceTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="company-website" className="flex items-center gap-1">
            <Globe className="h-4 w-4" /> Company Website
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-1">
            <Newspaper className="h-4 w-4" /> News
          </TabsTrigger>
          <TabsTrigger value="social-media" className="flex items-center gap-1">
            <Link className="h-4 w-4" /> Social Media
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="company-website" className="border p-4 rounded-md">
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Company Website URL:</p>
            <div className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://company-website.com"
                className="flex-1"
              />
              <Button 
                onClick={onSubmit}
                disabled={isLoading || !url.trim()}
                className="bg-ecofinex-tertiary hover:bg-ecofinex-tertiary/90"
              >
                {isLoading ? "Scraping..." : "Scrape"}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="news" className="border p-4 rounded-md">
          <p className="mb-2 text-sm font-medium">News Sources:</p>
          <ul className="space-y-2">
            {companyLinks.news?.map((newsUrl, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm truncate flex-1">{newsUrl}</span>
                <Button 
                  size="sm"
                  variant="outline"
                  className="ml-2"
                  onClick={() => {
                    setUrl(newsUrl);
                    setActiveTab("company-website");
                    setTimeout(() => {
                      onSubmit(new Event('click') as unknown as React.FormEvent);
                    }, 100);
                  }}
                >
                  Scrape
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="social-media" className="border p-4 rounded-md">
          <p className="mb-2 text-sm font-medium">Social Media Profiles:</p>
          <ul className="space-y-2">
            {companyLinks.social?.map((socialUrl, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm truncate flex-1">{socialUrl}</span>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="ml-2"
                  onClick={() => {
                    setUrl(socialUrl);
                    setActiveTab("company-website");
                    setTimeout(() => {
                      onSubmit(new Event('click') as unknown as React.FormEvent);
                    }, 100);
                  }}
                >
                  Scrape
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};
