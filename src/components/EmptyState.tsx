import { Heart } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = 'No favorites yet',
  description = 'Add items to your favorites to see them here.',
  icon = <Heart className="mb-2 h-12 w-12 text-gray-300" />,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex h-full flex-col items-center justify-center text-muted-foreground ${className}`}>
      {icon}
      <span className="mb-1 text-lg font-medium">{title}</span>
      <span className="max-w-xs text-center text-sm">{description}</span>
    </div>
  );
}
