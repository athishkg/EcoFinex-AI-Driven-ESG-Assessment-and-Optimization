
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Settings, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  hasBadge?: boolean;
  badgeText?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to, icon: Icon, label, isActive, hasBadge, badgeText
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
      isActive 
        ? "bg-sidebar-accent text-sidebar-foreground" 
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
    {hasBadge && (
      <Badge variant="secondary" className="ml-auto bg-ecofinex-accent text-white font-bold">
        {badgeText}
      </Badge>
    )}
  </Link>
);

export function AppSidebar() {
  const location = useLocation();
  
  const navItems = [
    { 
      to: '/dashboard', 
      icon: Home, 
      label: 'Dashboard', 
      isActive: location.pathname === '/dashboard',
      hasBadge: false 
    },
    { 
      to: '/analytics', 
      icon: BarChart3, 
      label: 'Analytics', 
      isActive: location.pathname === '/analytics',
      hasBadge: false 
    },
    { 
      to: '/nlp', 
      icon: Bot, 
      label: 'NLP', 
      isActive: location.pathname === '/nlp',
      hasBadge: true,
      badgeText: 'NEW'
    },
    { 
      to: '/settings', 
      icon: Settings, 
      label: 'Settings', 
      isActive: location.pathname === '/settings',
      hasBadge: false 
    },
  ];

  return (
    <div className="h-screen w-64 flex-shrink-0 bg-ecofinex-primary fixed left-0 top-0 z-40">
      <div className="flex items-center justify-center py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-ecofinex-accent flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="text-xl font-bold text-white">EcoFinex</h1>
        </div>
      </div>

      <div className="p-4 space-y-1">
        <p className="text-xs text-white/50 uppercase font-medium mb-2 pl-3">Main Navigation</p>
        {navItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-sidebar-accent">
        <p className="text-xs text-white/80 font-medium">AI-powered Sustainable Investment Advisor</p>
      </div>
    </div>
  );
}
