import { LucideIcon } from 'lucide-react';

export interface PersonaCardProps {
  label: string;
  title: string;
  description: string[];
  ctaText: string;
  Icon: LucideIcon;
}

export interface ProjectKit {
  id: string;
  label: string;
  title: string;
  specs: string[];
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}