export interface Card {
  id: string;
  title: string;
  content: string;
  date: string; // Ensure 'date' is included
  status: string; // Ensure 'status' is included
  type?: string; // Optional
  user?: string; // Optional
  bgColor?: string; // Optional
  icon?: string; // Optional
}
