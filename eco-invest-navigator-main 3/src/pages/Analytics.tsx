
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart as RechartsLineChart, Line, Legend } from 'recharts';

// Mock data for sentiment analysis
const sentimentData = [
  { company: 'Tata Power', sentimentScore: 78, source: 'Financial Times' },
  { company: 'Adani Green', sentimentScore: 63, source: 'Economic Times' },
  { company: 'ReNew Power', sentimentScore: 81, source: 'Bloomberg' },
  { company: 'Suzlon Energy', sentimentScore: 72, source: 'Reuters' },
  { company: 'NTPC Green', sentimentScore: 65, source: 'CNBC' },
  { company: 'JSW Energy', sentimentScore: 69, source: 'The Hindu Business Line' },
];

// Mock data for ESG comparison
const esgComparisonData = [
  { company: 'Tata Power', current: 76, predicted: 82 },
  { company: 'Adani Green', current: 72, predicted: 75 },
  { company: 'ReNew Power', current: 81, predicted: 86 },
  { company: 'Suzlon Energy', current: 77, predicted: 79 },
  { company: 'NTPC Green', current: 68, predicted: 73 },
];

// Mock data for Historical ESG Trends
const historicalTrendData = [
  { month: 'Jan', TataPower: 65, AdaniGreen: 61, RenewPower: 75 },
  { month: 'Feb', TataPower: 68, AdaniGreen: 63, RenewPower: 74 },
  { month: 'Mar', TataPower: 67, AdaniGreen: 65, RenewPower: 76 },
  { month: 'Apr', TataPower: 70, AdaniGreen: 66, RenewPower: 78 },
  { month: 'May', TataPower: 72, AdaniGreen: 68, RenewPower: 79 },
  { month: 'Jun', TataPower: 74, AdaniGreen: 69, RenewPower: 80 },
  { month: 'Jul', TataPower: 76, AdaniGreen: 72, RenewPower: 81 },
];

// Tailored color scheme for charts
const colors = ['#0B6E4F', '#08A045', '#0496FF', '#F45D01', '#629677', '#8ECAE6'];

// Helper function to determine color based on sentiment score
const getSentimentColor = (score: number) => {
  if (score >= 80) return '#10B981'; // Green for high scores
  if (score >= 70) return '#34D399'; // Light green
  if (score >= 60) return '#FBBF24'; // Yellow
  if (score >= 50) return '#F59E0B'; // Amber
  return '#EF4444'; // Red for low scores
};

export default function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded border border-gray-100">
          <p className="font-bold">{payload[0].payload.company}</p>
          <p className="text-sm">Sentiment Score: <span className="font-semibold">{payload[0].value}</span></p>
          <p className="text-xs text-gray-500">Source: {payload[0].payload.source}</p>
        </div>
      );
    }
    return null;
  };

  const ESGTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded border border-gray-100">
          <p className="font-bold">{label}</p>
          <p className="text-sm flex items-center">
            <span className="h-3 w-3 bg-ecofinex-primary rounded-sm mr-2"></span>
            Current: <span className="font-semibold ml-1">{payload[0].value}</span>
          </p>
          <p className="text-sm flex items-center">
            <span className="h-3 w-3 bg-ecofinex-secondary rounded-sm mr-2"></span>
            Predicted: <span className="font-semibold ml-1">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Visualize sentiment and ESG performance data</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isRefreshing}
        >
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="sentiment">
        <TabsList className="mb-4">
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Sentiment Analysis
          </TabsTrigger>
          <TabsTrigger value="esg" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            ESG Comparison
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Historical Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sentiment">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Company Sentiment Analysis</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={sentimentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="company" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Sentiment Score', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' } 
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sentimentScore" name="Sentiment Score">
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentimentScore)} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
              Based on natural language processing of financial news and social media data
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="esg">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Current vs Predicted ESG Scores</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={esgComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="company" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'ESG Score', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' } 
                    }}
                  />
                  <Tooltip content={<ESGTooltip />} />
                  <Legend />
                  <Bar dataKey="current" name="Current Score" fill="#0B6E4F" />
                  <Bar dataKey="predicted" name="Predicted Score" fill="#08A045" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
              Comparison of current ESG scores and AI-predicted future scores across companies
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Historical ESG Trends (2025)</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={historicalTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    domain={[60, 90]}
                    label={{ 
                      value: 'ESG Score', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' } 
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="TataPower" 
                    name="Tata Power" 
                    stroke="#0B6E4F" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="AdaniGreen" 
                    name="Adani Green" 
                    stroke="#F45D01" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="RenewPower" 
                    name="ReNew Power" 
                    stroke="#0496FF" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
              Monthly ESG score trends for top Indian green energy companies in 2025
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
