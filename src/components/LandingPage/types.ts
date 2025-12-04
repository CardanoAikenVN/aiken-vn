import { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
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

export interface ProjectItem {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}
