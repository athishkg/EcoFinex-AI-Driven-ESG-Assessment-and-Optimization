
interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export class OllamaService {
  private static readonly API_URL = 'http://127.0.0.1:11434/api/generate';
  
  static async generateText(model: string, prompt: string, onChunk?: (text: string) => void): Promise<string> {
    const request: OllamaRequest = {
      model,
      prompt,
      stream: !!onChunk
    };
    
    try {
      console.log(`Calling Ollama API with model: ${model} and prompt: ${prompt}`);
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
      
      if (onChunk && response.body) {
        // Stream the response (pipeline approach)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        
        // This function recursively reads chunks and processes them
        const readChunk = async (): Promise<string> => {
          const { done, value } = await reader.read();
          
          if (done) {
            return fullText;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          
          try {
            // Each chunk is a JSON object
            const lines = chunk.trim().split('\n');
            
            for (const line of lines) {
              if (line.trim()) {
                const parsedChunk = JSON.parse(line);
                fullText += parsedChunk.response || '';
                // Pipeline the data to the frontend through the callback
                onChunk(parsedChunk.response || '');
              }
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
          
          return readChunk();
        };
        
        return readChunk();
      } else {
        // Return the complete response at once
        const data = await response.json();
        return data.response;
      }
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      throw error;
    }
  }
  
  static async getAvailableModels(): Promise<string[]> {
    try {
      console.log('Fetching available models from Ollama');
      const response = await fetch('http://127.0.0.1:11434/api/tags');
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Available models:', data);
      return data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      console.error('Error fetching available models:', error);
      return ['llama3']; // Default fallback
    }
  }
  
  // New method to integrate web scraping with Ollama
  static async webScrapAndAnalyze(model: string, url: string, question: string, onChunk?: (text: string) => void): Promise<string> {
    try {
      // Create a prompt that combines web scraping and analysis
      const prompt = `I need to analyze information from this website: ${url}. 
      Please answer this question: ${question || 'What are their sustainability initiatives, ESG metrics, and green projects?'}
      Provide a detailed analysis based on available information.`;
      
      // Use the streaming pipeline to get results from Ollama
      return this.generateText(model, prompt, onChunk);
    } catch (error) {
      console.error('Error in web scraping and analysis:', error);
      throw error;
    }
  }
}
