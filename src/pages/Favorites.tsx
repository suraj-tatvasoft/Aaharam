import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slice/userSlice';
import { IFoodItem } from '../types';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import { Heart } from 'lucide-react';

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
  { name: 'Khaman Dhokla', price: 60, image: 'https://t4.ftcdn.net/jpg/12/64/08/69/240_F_1264086991_7NJfBilVorYRiiyNjLVP4PXyI7tsFBDC.jpg' },
  { name: 'Vada Pav', price: 25, image: 'https://media.istockphoto.com/id/1444922691/photo/bombay-vada-pav-isolated-on-wooden-board-side-view-of-indian-food.jpg?s=1024x1024&w=is&k=20&c=9fTH42v-D8aaezuX6C1XXjUn3xQKZIF0orYcTNFlHIU=' },
  { name: 'Sandwich', price: 55, image: 'https://t3.ftcdn.net/jpg/01/45/44/54/240_F_145445465_Ka0OYPvrhIRDMOAIiv3rLvyvgyPUd8Bn.jpg' }
];
const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const reduxFavorites = useSelector((state: any) => state.user.favorites as IFoodItem[]);
  const favoritesSet = new Set(reduxFavorites.map(item => item.id));
  const { toast } = useToast();

  const handleToggleFavorite = (item: IFoodItem) => {
    if (favoritesSet.has(item.id)) {
      dispatch(removeFavorite(item.id));
      toast({
        title: 'Removed from favorites',
        description: `${item.name} removed from your favorites.`
      });
    } else {
      dispatch(addFavorite(item));
      toast({
        title: 'Added to favorites',
        description: `${item.name} added to your favorites.`
      });
    }
  };

  return (
    <PageLayout title="My Favorites">
      <div className="scrollbar-hide mx-auto w-full flex-1 overflow-y-auto px-4 pb-4 pt-4">
        {reduxFavorites.length === 0 ? (
          <EmptyState />
        ) : (
          reduxFavorites.map((item, index) => (
            <div key={index} className="mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
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
                onClick={() => handleToggleFavorite(item)}
                className="h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-destructive md:h-10 md:w-10"
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 ${favoritesSet.has(item.id) ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Favorites;
