import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slice/userSlice';
import Container from '@/components/Container';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import PromoBar from '@/components/PromoBar';
import FoodCard from '@/components/FoodCard';
import SimpleSideItemCard from './SimpleSideItemCard';
import MenuModal from '@/components/modals/MenuModal';
import CartModal from '@/components/modals/CartModal';
import ModifierModal from '@/components/modals/ModifierModal';
import FloatingCartButton from '@/components/FloatingCartButton';
import { useToast } from '@/hooks/use-toast';
import foodItemsData from '@/data/foodItems.json';
import AccordionSides from './AccordionSides';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  modifiers?: {
    [groupId: string]: string[];
    note?: string[];
  };
}

import { useRef, useEffect } from 'react';
import { IFoodItem, IModifierOption } from '@/types';

const FoodDelivery = () => {
  // Ref for the scrollable items container
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
    price: number;
    image: string;
    modifiers?: IModifierOption[];
  } | null>(null);
  const [cart, setCart] = useState<{ [id: string]: CartItem }>({});
  const dispatch = useDispatch();
  const reduxFavorites = useSelector((state: any) => state.user.favorites as IFoodItem[]);
  const favoritesSet = new Set(reduxFavorites.map((item) => item.id));
  const { toast } = useToast();

  const foodItems: IFoodItem[] = foodItemsData;

  const filteredItems = foodItems.filter((item) => item.category === activeCategory);

  // Cart handlers
  const handleAddItem = (id: string) => {
    const item = foodItems.find((item) => item.id === id);
    if (!item) return;

    // Check if item is available
    if (item.available === false) {
      toast({
        title: 'Not available',
        description: item.unavailableReason || 'This item is currently unavailable.',
        variant: 'destructive',
      });
      return;
    }

    // If item has modifiers, open modifier modal
    if (item.modifiers && item.modifiers.length > 0) {
      setSelectedItem(item);
      setIsModifierModalOpen(true);
      return;
    }

    // Add item to cart directly if no modifiers
    addToCart(item.id, item.name, item.price, item.image);
  };

  const handleAddWithModifiers = (selectedModifiers: Record<string, string[]>, price: number) => {
    if (!selectedItem) return;

    addToCart(selectedItem.id, selectedItem.name, price, selectedItem.image, selectedModifiers);

    // Reset selected item
    setSelectedItem(null);
  };

  const addToCart = (id: string, name: string, price: number, image: string, modifiers?: Record<string, string[]>) => {
    setCart((prev) => {
      const existingItem = prev[id];

      // If item already exists in cart, just update quantity
      if (existingItem) {
        return {
          ...prev,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            // Keep existing modifiers or use new ones if provided
            modifiers: modifiers || existingItem.modifiers,
          },
        };
      }

      // Add new item to cart
      return {
        ...prev,
        [id]: {
          id,
          name,
          price,
          image,
          quantity: 1,
          modifiers,
        },
      };
    });

    toast({
      title: 'Added to cart',
      description: `${name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      if (quantity < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...prev[id], quantity } };
    });
  };

  const handleClearCart = () => {
    setCart({});
    setIsCartModalOpen(false);
  };
  const handleGenerateToken = () => {
    toast({ title: 'Token generated!', description: 'Your order has been placed.' });
    setCart({});
    setIsCartModalOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    const item = foodItems.find((item) => item.id === id);
    if (!item) return;
    if (favoritesSet.has(id)) {
      dispatch(removeFavorite(id));
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

  // Smooth scroll to top on activeCategory change
  useEffect(() => {
    if (itemsContainerRef.current) {
      itemsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <Container>
      <div className="flex h-full max-h-full flex-col overflow-hidden bg-white">
        <div className="flex h-full w-full flex-1 bg-background">
          <div className="flex w-full flex-col overflow-hidden bg-background shadow-lg">
            <Header onMenuClick={() => setIsMenuModalOpen(true)} />
            <main className="flex w-full flex-1 flex-col overflow-y-hidden">
              <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              {/* <PromoBar /> */}
              {/* Food Items List */}
              <div
                style={{ padding: activeCategory === 'sides' ? '0' : '16px' }}
                ref={itemsContainerRef}
                className="scrollbar-hide w-full flex-1 space-y-4 overflow-y-auto bg-[#F7F7F7]"
              >
                {/* Accordion UI for Sides */}
                {activeCategory === 'sides' ? (
                  <AccordionSides
                    items={filteredItems}
                    onAddItem={handleAddItem}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favoritesSet}
                    cart={cart}
                    onQuantityChange={handleQuantityChange}
                  />
                ) : (
                  filteredItems.map((item) =>
                    activeCategory === 'lunch' ? (
                      item.name === 'Regular Thali' ? (
                        <FoodCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                          description={item.description}
                          available={item.available}
                          unavailableReason={item.unavailableReason}
                          onAdd={handleAddItem}
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favoritesSet.has(item.id)}
                          quantity={cart[item.id]?.quantity || 0}
                          onQuantityChange={handleQuantityChange}
                        />
                      ) : (
                        <SimpleSideItemCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          image={item.image}
                          quantity={cart[item.id]?.quantity || 0}
                          onAdd={handleAddItem}
                          onQuantityChange={handleQuantityChange}
                          disabled={item.available === false}
                        />
                      )
                    ) : (
                      <FoodCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        description={item.description}
                        available={item.available}
                        unavailableReason={item.unavailableReason}
                        onAdd={handleAddItem}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={favoritesSet.has(item.id)}
                        quantity={cart[item.id]?.quantity || 0}
                        onQuantityChange={handleQuantityChange}
                      />
                    ),
                  )
                )}
              </div>
            </main>
          </div>
          {/* Modals */}
          <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
        </div>
      </div>
      {/* Floating Cart Button */}
      <FloatingCartButton count={Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)} onClick={() => setIsCartModalOpen(true)} />
      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={Object.values(cart)}
        onQuantityChange={handleQuantityChange}
        onClearCart={handleClearCart}
        onGenerateToken={handleGenerateToken}
      />

      {/* Modifier Modal */}
      {selectedItem && (
        <ModifierModal
          isOpen={isModifierModalOpen}
          onClose={() => {
            setIsModifierModalOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onAddToCart={(selectedModifiers, price) => handleAddWithModifiers(selectedModifiers, price)}
        />
      )}
    </Container>
  );
};

export default FoodDelivery;
