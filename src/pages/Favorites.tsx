import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAVORITES = [
  {
    name: 'Masala Tea',
    price: 15,
    image:
      'https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Poha',
    price: 40,
    image:
      'https://www.shutterstock.com/shutterstock/photos/1282013134/display_1500/stock-photo-aloo-kanda-poha-or-tarri-pohe-with-spicy-chana-masala-curry-selective-focus-1282013134.jpg'
  },
  { name: 'Khaman Dhokla', price: 60, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
  { name: 'Vada Pav', price: 25, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop' },
  { name: 'Sandwich', price: 55, image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop' }
];

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set(FAVORITES.map((f) => f.name)));
  const { toast } = useToast();

  const handleToggleFavorite = (name: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(name)) {
      newFavorites.delete(name);
      toast({
        title: 'Removed from favorites',
        description: `${name} removed from your favorites.`
      });
    } else {
      newFavorites.add(name);
      toast({
        title: 'Added to favorites',
        description: `${name} added to your favorites.`
      });
    }
    setFavorites(newFavorites);
  };

  return (
    <PageLayout title="My Favorites">
      <div className="scrollbar-hide mx-auto w-full flex-1 overflow-y-auto px-4 pb-4 pt-4">
        {FAVORITES.map((item, idx) => (
          <div key={item.name} className="mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[12px] bg-[#E9FFE4]">
              <img src={item.image} alt={item.name} className="h-full w-full rounded-[12px] object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="font-outfit truncate text-[16px] font-normal leading-[20px] text-[#212121]">{item.name}</span>
            </div>
            <span className="font-outfit mr-2 text-[14px] font-normal leading-[18px] text-[#212121]">₹{item.price}</span>
            <button className="font-outfit rounded-[8px] border border-[#38963B] px-3 py-[6px] text-[14px] font-medium leading-[18px] text-[#38963B] transition-colors hover:bg-[#E9FFE5]">
              Add
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToggleFavorite(item.name)}
              className="h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-destructive md:h-10 md:w-10"
            >
              <Heart className={`h-4 w-4 md:h-5 md:w-5 ${favorites.has(item.name) ? 'fill-destructive text-destructive' : ''}`} />
            </Button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Favorites;
