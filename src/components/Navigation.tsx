import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, LogIn, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const routes = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/food-delivery", icon: Utensils, label: "Food Delivery" },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border rounded-lg p-2 shadow-lg z-50">
      <div className="flex gap-1">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = location.pathname === route.path;

          return (
            <Link key={route.path} to={route.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex items-center gap-2",
                  isActive && "bg-success hover:bg-success/90 text-success-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
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