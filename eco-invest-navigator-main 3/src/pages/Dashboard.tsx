import React, { useState } from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  BarChart, 
  ChevronDown, 
  ChevronUp, 
  CornerDownRight,
  Database, 
  PieChart, 
  Search, 
  TrendingUp,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WebScrapingView } from '@/components/dashboard/WebScrapingView';
import { indianGreenCompanies, nlpData, esgData, strategyData } from '@/services/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [companyName, setCompanyName] = useState('');
  const [esgThreshold, setESGThreshold] = useState('70');
  const [showNLPResult, setShowNLPResult] = useState(false);
  const [showESGResult, setShowESGResult] = useState(false);
  const [showStrategyResult, setShowStrategyResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("input");
  
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCompanyName(input);
    
    // Show suggestions when typing
    if (input.trim() !== '') {
      const filtered = indianGreenCompanies.filter(company => 
        company.toLowerCase().includes(input.toLowerCase())
      );
      setCompanySuggestions(filtered);
    } else {
      setCompanySuggestions([]);
    }
  };
  
  const handleCompanySelect = (company: string) => {
    setCompanyName(company);
    setCompanySuggestions([]);
    // Automatically switch to web scraping tab when company is selected
    setActiveTab("scrape");
  };
  
  const handleESGThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setESGThreshold(e.target.value);
  };

  const handleScrapedDataReceived = (data: any) => {
    setScrapedData(data);
    setShowNLPResult(true);
  };
  
  const runNLPAnalysis = () => {
    if (!companyName.trim()) return;
    
    setIsLoading(true);
    setShowNLPResult(false);
    
    // Simulate API call
    setTimeout(() => {
      setShowNLPResult(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const runESGAnalysis = () => {
    if (!companyName.trim()) return;
    
    setIsLoading(true);
    setShowESGResult(false);
    
    // Simulate API call
    setTimeout(() => {
      setShowESGResult(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const runStrategyAnalysis = () => {
    if (!companyName.trim()) return;
    
    setIsLoading(true);
    setShowStrategyResult(false);
    
    // Simulate API call
    setTimeout(() => {
      setShowStrategyResult(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const getNLPData = () => {
    if (scrapedData) {
      return {
        company: companyName || 'Unknown Company',
        ...scrapedData
      };
    }
    
    const company = companyName.trim();
    if (company && nlpData[company]) {
      return {
        company,
        ...nlpData[company]
      };
    }
    return {
      company: companyName || 'Tata Power',
      project: 'Solar Microgrids Initiative in Rural Maharashtra',
      source: 'Economic Times - Green Business Review',
      date: 'April 10, 2025',
      description: 'Tata Power is deploying solar microgrids to bring renewable energy access to 200 villages in rural Maharashtra, focusing on sustainable development and local job creation.'
    };
  };
  
  const getESGData = () => {
    const company = companyName.trim();
    if (company && esgData[company]) {
      return {
        company,
        ...esgData[company]
      };
    }
    return {
      company: companyName || 'Tata Power',
      esg_score: 76.2,
      predicted_future_esg_score: 82.5,
      esg_risk_exposure: 'Medium',
      esg_risk_management: 'Strong',
      controversy_level: 'Low',
      controversy_score: 15.3,
      confidence: 0.89
    };
  };
  
  const getStrategyData = () => {
    const company = companyName.trim();
    if (company && strategyData[company]) {
      return {
        company,
        ...strategyData[company]
      };
    }
    return {
      company: companyName || 'Tata Power',
      recommendation: 'BUY',
      confidence: 0.85,
      expected_return: '12.3%',
      time_horizon: 'Medium-term (1-2 years)',
      risk_level: 'Moderate',
      factors: [
        'Strong ESG momentum',
        'Government renewable incentives',
        'Sector leadership position'
      ]
    };
  };
  
  const mockNLPData = getNLPData();
  const mockESGData = getESGData();
  const mockStrategyData = getStrategyData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">EcoFinex Dashboard</h1>
          <p className="text-muted-foreground">Sustainable investment analysis for Indian green companies</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-ecofinex-light text-ecofinex-primary px-3 py-1 text-xs">
            <Database className="w-3 h-3 mr-1" /> {indianGreenCompanies.length} Companies
          </Badge>
          <Badge variant="outline" className="bg-ecofinex-light text-ecofinex-primary px-3 py-1 text-xs">
            <BarChart className="w-3 h-3 mr-1" /> Live Data
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <Search className="w-4 h-4" /> Manual Input
          </TabsTrigger>
          <TabsTrigger value="scrape" className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> Web Scraping
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="mt-4">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Enter an Indian green company name..."
                    value={companyName}
                    onChange={handleCompanyChange}
                    className="pl-10"
                  />
                  
                  {/* Company suggestions dropdown */}
                  {companySuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                      <ul className="py-1">
                        {companySuggestions.map((company, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleCompanySelect(company)}
                          >
                            {company}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: Tata Power, Adani Green Energy, Suzlon Energy, ReNew Power, etc.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ESG Threshold (%)</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={esgThreshold}
                  onChange={handleESGThresholdChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Button 
                onClick={runNLPAnalysis}
                disabled={isLoading || !companyName.trim()}
                className="bg-ecofinex-tertiary hover:bg-ecofinex-tertiary/90"
              >
                Run NLP Analysis
              </Button>
              
              <Button 
                onClick={runESGAnalysis}
                disabled={isLoading || !companyName.trim()}
                className="bg-ecofinex-primary hover:bg-ecofinex-primary/90"
              >
                Run ESG Prediction
              </Button>
              
              <Button 
                onClick={runStrategyAnalysis}
                disabled={isLoading || !companyName.trim()}
                className="bg-ecofinex-accent hover:bg-ecofinex-accent/90"
              >
                Run Investment Strategy
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="scrape" className="mt-4">
          <WebScrapingView 
            onCompanyDataFetched={handleScrapedDataReceived} 
            companyName={companyName} 
          />
        </TabsContent>
      </Tabs>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ecofinex-primary"></div>
            <p className="mt-2 text-sm text-gray-500">Processing your request...</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {showNLPResult && (
          <Card className="p-6 border-l-4 border-l-ecofinex-tertiary">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <Database className="h-5 w-5 mr-2 text-ecofinex-tertiary" />
                  NLP Project Discovery
                </h3>
                <p className="text-sm text-muted-foreground">Natural Language Processing results</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNLPResult(false)}
                className="h-8 w-8 p-0"
              >
                <ChevronUp size={16} />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm font-bold">{mockNLPData.company}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Latest Green Initiative</p>
                  <p className="text-base font-semibold mt-1">{mockNLPData.project}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Source</p>
                  <div className="flex items-center mt-1">
                    <CornerDownRight className="h-4 w-4 mr-1 text-ecofinex-tertiary" />
                    <p className="text-sm">{mockNLPData.source}</p>
                    <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{mockNLPData.date}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm mt-1">{mockNLPData.description}</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {showESGResult && (
          <Card className="p-6 border-l-4 border-l-ecofinex-primary">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-ecofinex-primary" />
                  ESG Performance Prediction
                </h3>
                <p className="text-sm text-muted-foreground">Supervised model predictions</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowESGResult(false)}
                className="h-8 w-8 p-0"
              >
                <ChevronUp size={16} />
              </Button>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="bg-slate-50 p-4 rounded-lg flex-1">
                  <p className="text-sm font-medium">Current ESG Score</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-bold">{mockESGData.esg_score.toFixed(1)}</p>
                    <p className="text-sm text-gray-500 ml-1">/100</p>
                  </div>
                  <Progress 
                    value={mockESGData.esg_score} 
                    className={`h-2 mt-2 ${
                      mockESGData.esg_score >= 70 ? "bg-secondary [&>div]:bg-green-500" : 
                      mockESGData.esg_score >= 50 ? "bg-secondary [&>div]:bg-yellow-500" : 
                      "bg-secondary [&>div]:bg-red-500"
                    }`}
                  />
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg flex-1">
                  <p className="text-sm font-medium">Predicted Future Score</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-bold">{mockESGData.predicted_future_esg_score.toFixed(1)}</p>
                    <p className="text-sm text-gray-500 ml-1">/100</p>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {(mockESGData.predicted_future_esg_score - mockESGData.esg_score).toFixed(1)}
                    </span>
                  </div>
                  <Progress 
                    value={mockESGData.predicted_future_esg_score} 
                    className={`h-2 mt-2 ${
                      mockESGData.predicted_future_esg_score >= 70 ? "bg-secondary [&>div]:bg-green-500" : 
                      mockESGData.predicted_future_esg_score >= 50 ? "bg-secondary [&>div]:bg-yellow-500" : 
                      "bg-secondary [&>div]:bg-red-500"
                    }`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-medium">Risk Exposure</p>
                  <p className="text-sm font-bold mt-1">{mockESGData.esg_risk_exposure}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-medium">Risk Management</p>
                  <p className="text-sm font-bold mt-1">{mockESGData.esg_risk_management}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-medium">Controversy Level</p>
                  <p className="text-sm font-bold mt-1">{mockESGData.controversy_level}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs font-medium">Controversy Score</p>
                  <p className="text-sm font-bold mt-1">{mockESGData.controversy_score.toFixed(1)}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Final Prediction</p>
                    <p className="text-base font-bold mt-1 flex items-center">
                      {parseFloat(esgThreshold) <= mockESGData.predicted_future_esg_score ? (
                        <>
                          <span className="text-green-600">Meets ESG Threshold</span>
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Recommended</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-600">Below ESG Threshold</span>
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Not Recommended</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Prediction Confidence</p>
                    <p className="text-base font-bold mt-1">{(mockESGData.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {showStrategyResult && (
          <Card className="p-6 border-l-4 border-l-ecofinex-accent">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-ecofinex-accent" />
                  AI Investment Strategy
                </h3>
                <p className="text-sm text-muted-foreground">Reinforcement learning recommendation</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowStrategyResult(false)}
                className="h-8 w-8 p-0"
              >
                <ChevronUp size={16} />
              </Button>
            </div>
            
            <div className="mt-4">
              <div className={`bg-slate-50 p-6 rounded-lg border-2 ${
                mockStrategyData.recommendation === 'BUY' 
                  ? 'border-green-500' 
                  : mockStrategyData.recommendation === 'HOLD'
                    ? 'border-yellow-500'
                    : 'border-red-500'
              }`}>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm font-bold">{mockStrategyData.company}</p>
                </div>
                
                <div className="mt-6 flex items-center justify-center">
                  <div className={`text-center p-4 rounded-full ${
                    mockStrategyData.recommendation === 'BUY' 
                      ? 'bg-green-100 text-green-800' 
                      : mockStrategyData.recommendation === 'HOLD'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    <p className="text-3xl font-bold mb-1">{mockStrategyData.recommendation}</p>
                    <p className="text-sm">Confidence: {(mockStrategyData.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Expected Return</p>
                    <p className="text-base font-semibold mt-1">{mockStrategyData.expected_return}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time Horizon</p>
                    <p className="text-base font-semibold mt-1">{mockStrategyData.time_horizon}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Risk Level</p>
                    <p className="text-base font-semibold mt-1">{mockStrategyData.risk_level}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Key Factors</p>
                  <ul className="space-y-2">
                    {mockStrategyData.factors.map((factor, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ArrowRight className="h-3 w-3 mr-2 flex-shrink-0 text-ecofinex-accent" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-ecofinex-accent hover:bg-ecofinex-accent/90">
                    Save Recommendation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
