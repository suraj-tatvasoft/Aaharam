import { useState } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import PromoBar from "@/components/PromoBar";
import FoodCard from "@/components/FoodCard";
import MenuModal from "@/components/modals/MenuModal";
import NotificationModal from "@/components/modals/NotificationModal";
import CartModal from "@/components/modals/CartModal";
import FloatingCartButton from "@/components/FloatingCartButton";
import { useToast } from "@/hooks/use-toast";
import foodItemsData from "@/data/foodItems.json";

// Import food images

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  available?: boolean;
  unavailableReason?: string;
}

const FoodDelivery = () => {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cart, setCart] = useState<{ [id: string]: { id: string; name: string; price: number; image: string; quantity: number } }>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const foodItems: FoodItem[] = foodItemsData;

  const filteredItems = foodItems.filter(item => item.category === activeCategory);

  // Cart handlers
  const handleAddItem = (id: string) => {
    const item = foodItems.find(item => item.id === id);
    if (item) {
      setCart(prev => {
        if (prev[id]) return prev;
        return { ...prev, [id]: { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 } };
      });
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(prev => {
      if (!prev[id]) return prev;
      if (quantity < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...prev[id], quantity } };
    });
  };

  const handleClearCart = () => setCart({});
  const handleGenerateToken = () => {
    toast({ title: "Token generated!", description: "Your order has been placed." });
    setCart({});
    setIsCartModalOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      toast({
        title: "Removed from favorites",
        description: "Item removed from your favorites.",
      });
    } else {
      newFavorites.add(id);
      toast({
        title: "Added to favorites",
        description: "Item added to your favorites.",
      });
    }
    setFavorites(newFavorites);
  };

  return (
    <Container>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="max-h-screen min-h-screen h-full flex overflow-hidden bg-background">
          <div className="max-w-md mx-auto bg-background shadow-lg flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setIsMenuModalOpen(true)} />
            <main className="flex flex-col overflow-y-hidden flex-1">
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <PromoBar />
              {/* Food Items List */}
              <div className="p-4 space-y-2 bg-gray-100 w-full flex-1 overflow-y-auto scrollbar-hide">
                {filteredItems.map((item) => (
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
                    isFavorite={favorites.has(item.id)}
                    quantity={cart[item.id]?.quantity || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </main>
          </div>
          {/* Modals */}
          <MenuModal
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
          />
          <NotificationModal
            isOpen={isNotificationModalOpen}
            onClose={() => setIsNotificationModalOpen(false)}
          />
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
    </Container>
  );
};

export default FoodDelivery;