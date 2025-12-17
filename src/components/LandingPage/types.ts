import type { LucideIcon } from 'lucide-react';

export interface Quest {
  id: string;
  number: number;
  title: string;
  description: string;
  imageAlt: string;
  colorTheme: string;
  illustrationType: 'token' | 'staking' | 'vendor' | 'lending' | 'stable' | 'wallet' | 'nft';
  link?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface CurriculumNode {
  id: string;
  title: string;
  description: string;
}
