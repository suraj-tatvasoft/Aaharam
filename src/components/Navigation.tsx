import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, LogIn, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const routes = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/food-delivery', icon: Utensils, label: 'Food Delivery' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg border bg-background/80 p-2 shadow-lg backdrop-blur-sm">
      <div className="flex gap-1">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = location.pathname === route.path;

          return (
            <Link key={route.path} to={route.path}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                className={cn('flex items-center gap-2', isActive && 'bg-success text-success-foreground hover:bg-success/90')}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{route.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
