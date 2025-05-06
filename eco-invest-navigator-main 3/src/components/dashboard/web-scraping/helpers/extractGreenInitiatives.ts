
interface PageData {
  text?: string;
  url?: string;
}

interface CrawlData {
  data?: PageData[];
}

export const extractGreenInitiatives = (data: CrawlData | null, defaultUrl: string) => {
  if (!data || !data.data || !Array.isArray(data.data)) {
    return [];
  }
  
  const greenKeywords = [
    'green', 'sustainable', 'renewable', 'eco', 'environment', 'carbon',
    'solar', 'wind', 'hydro', 'clean energy', 'climate', 'biodiversity',
    'net-zero', 'esg', 'sustainability', 'conservation', 'recycling'
  ];
  
  const initiatives: { text: string; url: string; score: number }[] = [];
  
  data.data.forEach((page: PageData) => {
    if (!page.text) return;
    
    // Split text into paragraphs
    const paragraphs = page.text.split('\n\n');
    
    paragraphs.forEach((paragraph: string) => {
      if (paragraph.length < 20) return; // Skip short paragraphs
      
      // Calculate relevance score based on keyword matches
      let score = 0;
      greenKeywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = paragraph.match(regex);
        if (matches) score += matches.length;
      });
      
      if (score > 0) {
        initiatives.push({
          text: paragraph,
          url: page.url || defaultUrl,
          score: score
        });
      }
    });
  });
  
  // Sort by relevance score (highest first)
  return initiatives.sort((a, b) => b.score - a.score);
};
