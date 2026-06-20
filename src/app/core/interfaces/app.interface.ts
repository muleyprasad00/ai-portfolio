export interface Theme {
  name: 'light' | 'dark';
  isDark: boolean;
}

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatHistoryMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PortfolioSearchResult {
  id: string;
  type: 'Skill' | 'Project' | 'Experience' | 'Profile' | 'Contact';
  title: string;
  summary: string;
}

export interface PortfolioFaqItem {
  question: string;
  query: string;
}
