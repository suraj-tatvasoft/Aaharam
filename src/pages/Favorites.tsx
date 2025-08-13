import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slice/userSlice';
import { IFoodItem } from '../types';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import EmptyState from '@/components/EmptyState';
import { Heart } from 'lucide-react';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const reduxFavorites = useSelector((state: any) => state.user.favorites as IFoodItem[]);
  const favoritesSet = new Set(reduxFavorites.map((item) => item.id));
  const { toast } = useToast();

  const handleToggleFavorite = (item: IFoodItem) => {
    if (favoritesSet.has(item.id)) {
      dispatch(removeFavorite(item.id));
      toast({
        title: 'Removed from favorites',
        description: `${item.name} removed from your favorites.`,
      });
    } else {
      dispatch(addFavorite(item));
      toast({
        title: 'Added to favorites',
        description: `${item.name} added to your favorites.`,
      });
    }
  };

  return (
    <PageLayout title="My Favorites">
      <div className="scrollbar-hide mx-auto w-full flex-1 space-y-4 overflow-y-auto p-4">
        {reduxFavorites.length === 0 ? (
          <EmptyState />
        ) : (
          reduxFavorites.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 rounded-2xl bg-white py-1 pl-1 pr-[14px]">
              <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-[12px]">
                <img src={item.image} alt={item.name} className="h-full w-full rounded-[12px] object-cover" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="truncate text-[16px] font-normal leading-[11px] text-[#212121]">{item.name}</span>
              </div>

              <span className="text-[14px] font-normal leading-[10px] text-[#212121]">₹{item.price}</span>

              <button className="h-[30px] w-[50px] rounded-[8px] border border-[#38963B] text-[14px] font-medium leading-[10px] text-[#38963B]">
                Add
              </button>

              <Heart
                onClick={() => handleToggleFavorite(item)}
                className={`h-4 w-4 cursor-pointer ${favoritesSet.has(item.id) ? 'fill-[#F53939] text-[#F53939]' : ''}`}
              />
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Favorites;
