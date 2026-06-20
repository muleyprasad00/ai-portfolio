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
