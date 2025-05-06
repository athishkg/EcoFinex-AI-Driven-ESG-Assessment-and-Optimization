
// Mock data for Indian green companies
export const indianGreenCompanies = [
  "Tata Power",
  "Adani Green Energy",
  "ReNew Power",
  "Suzlon Energy",
  "NTPC Green Energy",
  "JSW Energy",
  "Azure Power",
  "Sterling and Wilson Renewable Energy",
  "Inox Wind",
  "Borosil Renewables",
  "Websol Energy Systems",
  "Orient Green Power",
  "Indosolar",
  "Surana Solar",
  "Ujaas Energy",
  "Reliance Power Renewables",
  "Manikaran Power",
  "Torrent Power Green",
  "Hero Future Energies",
  "Acme Solar",
  "Avaada Energy",
  "CleanMax Solar",
  "Vikram Solar",
  "Adani Solar",
  "Waaree Energies"
];

// Mock NLP data
export const nlpData: Record<string, {
  project: string;
  source: string;
  date: string;
  description: string;
}> = {
  "Tata Power": {
    project: "Solar Microgrids Initiative in Rural Maharashtra",
    source: "Economic Times - Green Business Review",
    date: "April 10, 2025",
    description: "Tata Power is deploying solar microgrids to bring renewable energy access to 200 villages in rural Maharashtra, focusing on sustainable development and local job creation."
  },
  "Adani Green Energy": {
    project: "50 GW Solar-Wind Hybrid Park in Gujarat",
    source: "Financial Express - Energy Section",
    date: "March 22, 2025",
    description: "Adani Green Energy has launched construction of a massive 50 GW solar-wind hybrid park, set to be the largest renewable energy installation in India."
  },
  "ReNew Power": {
    project: "AI-Powered Smart Grid Management System",
    source: "Bloomberg Green",
    date: "April 5, 2025",
    description: "ReNew Power has deployed an advanced AI-driven grid management system to optimize energy distribution and reduce transmission losses by up to 25%."
  },
  "Suzlon Energy": {
    project: "Offshore Wind Farm in Tamil Nadu Coast",
    source: "The Hindu Business Line",
    date: "March 15, 2025",
    description: "Suzlon Energy has secured approvals for India's largest offshore wind farm along the Tamil Nadu coast, with potential generation capacity of 3 GW."
  },
  "NTPC Green Energy": {
    project: "Green Hydrogen Production Plant in Rajasthan",
    source: "Mint - Clean Energy",
    date: "April 8, 2025",
    description: "NTPC Green Energy has commissioned a green hydrogen production facility powered entirely by solar energy, positioned as a key component in India's energy transition."
  },
  "JSW Energy": {
    project: "Energy Storage Solutions Development",
    source: "Business Standard",
    date: "March 30, 2025",
    description: "JSW Energy has inaugurated a battery technology research center focused on developing India-specific energy storage solutions for grid stability."
  },
  "Azure Power": {
    project: "Floating Solar Project on Kerala Backwaters",
    source: "Energy World India",
    date: "April 12, 2025",
    description: "Azure Power has launched an innovative floating solar installation on Kerala backwaters, designed to generate power while minimizing land use impact."
  },
  "Sterling and Wilson Renewable Energy": {
    project: "Solar EPC Services for Rural Electrification",
    source: "Power Line Magazine",
    date: "March 25, 2025",
    description: "Sterling and Wilson is leading a consortium to provide solar EPC services for the government's rural electrification program across five states."
  },
  "Inox Wind": {
    project: "Next-Gen Wind Turbine Manufacturing",
    source: "Wind Power Monthly",
    date: "April 2, 2025",
    description: "Inox Wind has unveiled a new manufacturing facility for next-generation wind turbines with increased efficiency and lower maintenance requirements."
  },
  "Borosil Renewables": {
    project: "Anti-Reflective Solar Glass Innovation",
    source: "PV Magazine India",
    date: "March 18, 2025",
    description: "Borosil Renewables has patented a new anti-reflective coating for solar glass that improves energy capture by up to 3.5% in high-temperature conditions."
  },
  "Websol Energy Systems": {
    project: "Indigenous Solar Cell Manufacturing",
    source: "Manufacturing Today",
    date: "April 3, 2025",
    description: "Websol Energy has inaugurated India's largest indigenous solar cell manufacturing facility, reducing dependency on imported components for the solar industry."
  },
  "Orient Green Power": {
    project: "Biomass Energy from Agricultural Waste",
    source: "Agri-Business Review",
    date: "March 27, 2025",
    description: "Orient Green Power has launched a program to convert agricultural waste from Punjab and Haryana into biomass energy, addressing both energy needs and stubble burning issues."
  },
  "Reliance Power Renewables": {
    project: "Integrated Green Hydrogen Ecosystem",
    source: "Industrial Quarterly",
    date: "April 14, 2025",
    description: "Reliance Power Renewables announced an end-to-end green hydrogen ecosystem including production, storage, and transportation infrastructure with ₹75,000 crore investment."
  },
  "Hero Future Energies": {
    project: "Solar-Wind Hybrid with Storage in Rajasthan",
    source: "Energy Storage News",
    date: "April 7, 2025",
    description: "Hero Future Energies has commissioned a solar-wind hybrid power plant with integrated battery storage in Rajasthan, providing reliable round-the-clock renewable power."
  },
  "Acme Solar": {
    project: "Green Ammonia Production Facility",
    source: "Chemical Engineering World",
    date: "March 29, 2025",
    description: "Acme Solar has broken ground on a green ammonia production facility in Gujarat that will utilize solar power for sustainable fertilizer production."
  }
};

// Mock ESG data
export const esgData: Record<string, {
  esg_score: number;
  predicted_future_esg_score: number;
  esg_risk_exposure: string;
  esg_risk_management: string;
  controversy_level: string;
  controversy_score: number;
  confidence: number;
}> = {
  "Tata Power": {
    esg_score: 76.2,
    predicted_future_esg_score: 82.5,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Strong",
    controversy_level: "Low",
    controversy_score: 15.3,
    confidence: 0.89
  },
  "Adani Green Energy": {
    esg_score: 72.8,
    predicted_future_esg_score: 75.6,
    esg_risk_exposure: "Medium-High",
    esg_risk_management: "Moderate",
    controversy_level: "Medium",
    controversy_score: 28.7,
    confidence: 0.84
  },
  "ReNew Power": {
    esg_score: 81.4,
    predicted_future_esg_score: 86.2,
    esg_risk_exposure: "Low",
    esg_risk_management: "Strong",
    controversy_level: "Very Low",
    controversy_score: 8.2,
    confidence: 0.92
  },
  "Suzlon Energy": {
    esg_score: 77.1,
    predicted_future_esg_score: 79.3,
    esg_risk_exposure: "Medium-Low",
    esg_risk_management: "Strong",
    controversy_level: "Low",
    controversy_score: 12.8,
    confidence: 0.87
  },
  "NTPC Green Energy": {
    esg_score: 68.6,
    predicted_future_esg_score: 73.8,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Improving",
    controversy_level: "Low",
    controversy_score: 18.5,
    confidence: 0.85
  },
  "JSW Energy": {
    esg_score: 73.2,
    predicted_future_esg_score: 77.8,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Moderate",
    controversy_level: "Low",
    controversy_score: 14.2,
    confidence: 0.86
  },
  "Azure Power": {
    esg_score: 79.5,
    predicted_future_esg_score: 84.2,
    esg_risk_exposure: "Low",
    esg_risk_management: "Strong",
    controversy_level: "Very Low",
    controversy_score: 7.8,
    confidence: 0.91
  },
  "Sterling and Wilson Renewable Energy": {
    esg_score: 71.3,
    predicted_future_esg_score: 74.8,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Moderate",
    controversy_level: "Low",
    controversy_score: 13.5,
    confidence: 0.82
  },
  "Inox Wind": {
    esg_score: 69.8,
    predicted_future_esg_score: 73.5,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Improving",
    controversy_level: "Medium-Low",
    controversy_score: 16.7,
    confidence: 0.83
  },
  "Borosil Renewables": {
    esg_score: 80.1,
    predicted_future_esg_score: 83.7,
    esg_risk_exposure: "Low",
    esg_risk_management: "Strong",
    controversy_level: "Very Low",
    controversy_score: 6.3,
    confidence: 0.90
  },
  "Websol Energy Systems": {
    esg_score: 71.5,
    predicted_future_esg_score: 75.9,
    esg_risk_exposure: "Medium",
    esg_risk_management: "Moderate",
    controversy_level: "Low",
    controversy_score: 14.7,
    confidence: 0.81
  },
  "Reliance Power Renewables": {
    esg_score: 74.8,
    predicted_future_esg_score: 79.5,
    esg_risk_exposure: "Medium-Low",
    esg_risk_management: "Strong",
    controversy_level: "Low",
    controversy_score: 12.4,
    confidence: 0.87
  },
  "Hero Future Energies": {
    esg_score: 77.4,
    predicted_future_esg_score: 82.1,
    esg_risk_exposure: "Low",
    esg_risk_management: "Strong",
    controversy_level: "Very Low",
    controversy_score: 8.9,
    confidence: 0.89
  }
};

// Mock investment strategy data
export const strategyData: Record<string, {
  recommendation: string;
  confidence: number;
  expected_return: string;
  time_horizon: string;
  risk_level: string;
  factors: string[];
}> = {
  "Tata Power": {
    recommendation: "BUY",
    confidence: 0.85,
    expected_return: "12.3%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Strong ESG momentum",
      "Government renewable incentives",
      "Sector leadership position"
    ]
  },
  "Adani Green Energy": {
    recommendation: "HOLD",
    confidence: 0.72,
    expected_return: "8.7%",
    time_horizon: "Long-term (2+ years)",
    risk_level: "Moderate-High",
    factors: [
      "Ambitious growth targets",
      "Regulatory uncertainty",
      "High debt levels"
    ]
  },
  "ReNew Power": {
    recommendation: "BUY",
    confidence: 0.91,
    expected_return: "15.4%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Technology innovation edge",
      "Strong international partnerships",
      "Favorable policy environment"
    ]
  },
  "Suzlon Energy": {
    recommendation: "BUY",
    confidence: 0.79,
    expected_return: "11.8%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate-High",
    factors: [
      "Offshore wind potential",
      "Restructured finances",
      "Export market expansion"
    ]
  },
  "NTPC Green Energy": {
    recommendation: "HOLD",
    confidence: 0.76,
    expected_return: "9.3%",
    time_horizon: "Long-term (2+ years)",
    risk_level: "Low-Moderate",
    factors: [
      "Government backing",
      "Diversification into hydrogen",
      "Legacy transition challenges"
    ]
  },
  "JSW Energy": {
    recommendation: "BUY",
    confidence: 0.82,
    expected_return: "11.5%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Storage technology investments",
      "Diversified green portfolio",
      "Strong financial position"
    ]
  },
  "Azure Power": {
    recommendation: "BUY",
    confidence: 0.88,
    expected_return: "14.2%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Innovative project pipeline",
      "Strong growth momentum",
      "International backing"
    ]
  },
  "Sterling and Wilson Renewable Energy": {
    recommendation: "HOLD",
    confidence: 0.74,
    expected_return: "7.9%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate-High",
    factors: [
      "EPC market volatility",
      "Project execution track record",
      "Competitive pressures"
    ]
  },
  "Inox Wind": {
    recommendation: "HOLD",
    confidence: 0.71,
    expected_return: "8.3%",
    time_horizon: "Long-term (2+ years)",
    risk_level: "High",
    factors: [
      "Manufacturing capacity expansion",
      "Technology transition period",
      "Market share challenges"
    ]
  },
  "Borosil Renewables": {
    recommendation: "BUY",
    confidence: 0.86,
    expected_return: "13.7%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate-Low",
    factors: [
      "Solar glass market leadership",
      "Material science innovation",
      "Export growth potential"
    ]
  },
  "Websol Energy Systems": {
    recommendation: "BUY",
    confidence: 0.77,
    expected_return: "10.8%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate-High",
    factors: [
      "Manufacturing expansion",
      "Import substitution opportunity",
      "Technology upgrade cycle"
    ]
  },
  "Orient Green Power": {
    recommendation: "HOLD",
    confidence: 0.69,
    expected_return: "6.5%",
    time_horizon: "Long-term (2+ years)",
    risk_level: "High",
    factors: [
      "Biomass supply chain complexity",
      "Operational efficiency improvements",
      "Policy support requirements"
    ]
  },
  "Reliance Power Renewables": {
    recommendation: "BUY",
    confidence: 0.84,
    expected_return: "13.1%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Hydrogen economy leadership",
      "Strong group financial backing",
      "Integrated energy approach"
    ]
  },
  "Hero Future Energies": {
    recommendation: "BUY",
    confidence: 0.83,
    expected_return: "12.6%",
    time_horizon: "Medium-term (1-2 years)",
    risk_level: "Moderate",
    factors: [
      "Hybrid-plus-storage innovation",
      "Corporate PPA market growth",
      "Strong execution capabilities"
    ]
  }
};

// Mock sentiment data
export const sentimentData = [
  { company: 'Tata Power', sentimentScore: 78, source: 'Financial Times' },
  { company: 'Adani Green', sentimentScore: 63, source: 'Economic Times' },
  { company: 'ReNew Power', sentimentScore: 81, source: 'Bloomberg' },
  { company: 'Suzlon Energy', sentimentScore: 72, source: 'Reuters' },
  { company: 'NTPC Green', sentimentScore: 65, source: 'CNBC' },
  { company: 'JSW Energy', sentimentScore: 69, source: 'The Hindu Business Line' },
  { company: 'Azure Power', sentimentScore: 74, source: 'Energy World India' },
  { company: 'Sterling and Wilson', sentimentScore: 67, source: 'Power Line Magazine' },
  { company: 'Inox Wind', sentimentScore: 71, source: 'Wind Power Monthly' },
  { company: 'Borosil Renewables', sentimentScore: 76, source: 'PV Magazine India' },
  { company: 'Websol Energy Systems', sentimentScore: 70, source: 'Manufacturing Today' },
  { company: 'Orient Green Power', sentimentScore: 62, source: 'Agri-Business Review' },
  { company: 'Indosolar', sentimentScore: 64, source: 'Solar Industry News' },
  { company: 'Surana Solar', sentimentScore: 68, source: 'PV Tech India' },
  { company: 'Ujaas Energy', sentimentScore: 66, source: 'Energy Trends India' },
  { company: 'Reliance Power Renewables', sentimentScore: 73, source: 'Industrial Quarterly' },
  { company: 'Manikaran Power', sentimentScore: 69, source: 'Power Market Journal' },
  { company: 'Torrent Power Green', sentimentScore: 71, source: 'Green Energy Review' },
  { company: 'Hero Future Energies', sentimentScore: 75, source: 'Energy Storage News' },
  { company: 'Acme Solar', sentimentScore: 72, source: 'Chemical Engineering World' },
];
