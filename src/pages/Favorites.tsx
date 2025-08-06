import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import favoriteHeart from "@/assets/favorite-heart.svg";
import { useToast } from "@/hooks/use-toast";

const FAVORITES = [
  { name: "Masala Tea", price: 15, image: "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Poha", price: 40, image: "https://www.shutterstock.com/shutterstock/photos/1282013134/display_1500/stock-photo-aloo-kanda-poha-or-tarri-pohe-with-spicy-chana-masala-curry-selective-focus-1282013134.jpg" },
  { name: "Khaman Dhokla", price: 60, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" },
  { name: "Vada Pav", price: 25, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
  { name: "Sandwich", price: 55, image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop" },
];

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set(FAVORITES.map(f => f.name)));
  const { toast } = useToast();

  const handleToggleFavorite = (name: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(name)) {
      newFavorites.delete(name);
      toast({
        title: "Removed from favorites",
        description: `${name} removed from your favorites.`,
      });
    } else {
      newFavorites.add(name);
      toast({
        title: "Added to favorites",
        description: `${name} added to your favorites.`,
      });
    }
    setFavorites(newFavorites);
  };

  return (
    <PageLayout title="My Favorites">
      <div className="w-full mx-auto px-4 pt-6 pb-4 min-h-screen">
        {FAVORITES.map((item, idx) => (
          <div
            key={item.name}
            className="flex items-center bg-white rounded-2xl mb-4 px-4 py-3 shadow-sm gap-3"
          >
            <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center bg-[#E9FFE4] overflow-hidden">
              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-[10px]" />
            </div>
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <span className="font-outfit font-normal text-[16px] leading-[20px] text-[#212121] truncate">{item.name}</span>
            </div>
            <span className="font-outfit font-normal text-[14px] leading-[18px] text-[#212121] mr-2">₹{item.price}</span>
            <button className="border border-[#38963B] text-[#38963B] rounded-[8px] px-3 py-[6px] text-[14px] leading-[18px] font-outfit font-medium hover:bg-[#E9FFE5] transition-colors">Add</button>
            <button
              className={`ml-2 w-auto h-auto flex items-center justify-center ${favorites.has(item.name) ? '' : 'opacity-40'}`}
              onClick={() => handleToggleFavorite(item.name)}
              aria-label={favorites.has(item.name) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <img src={favoriteHeart} alt="Favorite" className="w-[18.83px] h-[16.13px]" />
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Favorites;
