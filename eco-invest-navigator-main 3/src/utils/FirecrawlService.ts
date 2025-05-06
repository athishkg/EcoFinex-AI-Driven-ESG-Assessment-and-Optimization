import axios from 'axios';
import { toast } from 'sonner';

interface ApiConfig {
  key: string;
  baseURL: string;
}

interface CrawlScrapeOptions {
  url: string;
  javascript?: boolean;
  maxPages?: number;
  waitFor?: number;
  userAgent?: string;
  selectHtml?: string;
  parseLinks?: boolean;
  filters?: {
    allowDomains?: string[];
    allowPaths?: string[];
  };
}

interface CrawlOptions {
  startUrls: string[];
  maxPages?: number;
  javascript?: boolean;
  waitFor?: number;
  parseLinks?: boolean;
  userAgent?: string;
  filters?: {
    allowDomains?: string[];
    allowPaths?: string[];
  };
}

export class FirecrawlService {
  private static config: ApiConfig = {
    key: '',
    baseURL: 'https://api.firecrawl.dev'
  };

  static setApiKey(key: string): void {
    this.config.key = key;
    localStorage.setItem('firecrawl_api_key', key);
  }

  static getApiKey(): string {
    if (this.config.key) {
      return this.config.key;
    }
    
    const storedKey = localStorage.getItem('firecrawl_api_key');
    if (storedKey) {
      this.config.key = storedKey;
    }
    
    return this.config.key;
  }

  static saveApiKey(key: string): void {
    this.setApiKey(key);
    toast.success('API key saved successfully');
  }

  static async testApiKey(key: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.config.baseURL}/v1/status`, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  static async crawl(options: CrawlOptions): Promise<any> {
    try {
      const response = await axios.post(
        `${this.config.baseURL}/v1/crawl`,
        options,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.key}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Firecrawl API error:', error);
      this.handleApiError(error);
      throw error;
    }
  }

  static async crawlWebsite(url: string, options: Partial<CrawlOptions> = {}): Promise<any> {
    const defaultOptions: CrawlOptions = {
      startUrls: [url],
      maxPages: 10,
      javascript: true,
      parseLinks: true
    };
    
    return this.crawl({...defaultOptions, ...options});
  }

  static async crawlScrape(options: CrawlScrapeOptions): Promise<any> {
    try {
      const validOptions = { ...options };
      
      const response = await axios.post(
        `${this.config.baseURL}/v1/crawl-scrape`,
        validOptions,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.key}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Firecrawl API error:', error);
      this.handleApiError(error);
      throw error;
    }
  }

  private static handleApiError(error: any): void {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 401) {
        toast.error('Invalid API key. Please check your API key and try again.');
      } else if (status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else {
        toast.error(`API Error: ${message}`);
      }
    } else {
      toast.error('An unknown error occurred while connecting to the API.');
    }
  }
}
