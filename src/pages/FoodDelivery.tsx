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

  const foodItems: FoodItem[] = [
    // BREAKFAST (10)
    {
      id: "b1",
      name: "Masala Tea",
      price: 15,
      image: "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "breakfast",
      description: "Aromatic spiced tea with ginger and cardamom",
    },
    {
      id: "b2",
      name: "Poha",
      price: 40,
      image: "https://www.shutterstock.com/shutterstock/photos/1282013134/display_1500/stock-photo-aloo-kanda-poha-or-tarri-pohe-with-spicy-chana-masala-curry-selective-focus-1282013134.jpg",
      category: "breakfast",
      description: "Flattened rice with onions, curry leaves and spices",
    },
    {
      id: "b3",
      name: "Aloo Paratha",
      price: 45,
      image: "https://images.unsplash.com/photo-1707424963059-6a7a559cae28?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "breakfast",
      description: "Stuffed flatbread with spiced potato filling",
    },
    {
      id: "b4",
      name: "Upma",
      price: 35,
      image: "https://plus.unsplash.com/premium_photo-1675798917853-11d04d997979?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "breakfast",
      description: "Semolina cooked with vegetables and tempering",
    },
    {
      id: "b5",
      name: "Dosa",
      price: 50,
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "breakfast",
      description: "Crispy fermented crepe served with sambar and chutney",
    },
    {
      id: "b6",
      name: "Pancakes",
      price: 60,
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Fluffy pancakes with maple syrup and butter",
    },
    {
      id: "b7",
      name: "Vada Pav",
      price: 25,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Spiced potato fritter in a soft bun with chutneys",
    },
    {
      id: "b8",
      name: "Sandwich",
      price: 55,
      image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Grilled sandwich with fresh vegetables and cheese",
    },
    {
      id: "b9",
      name: "Sabudana Khichdi",
      price: 38,
      image: "https://www.shutterstock.com/shutterstock/photos/1787304494/display_1500/stock-photo-sabudana-khichdi-khichadi-is-an-indian-fasting-recipe-or-vrat-food-consumed-during-navratri-1787304494.jpg",
      category: "breakfast",
      description: "Pearl sago stir fried with potatoes, peanuts and spices",
    },
    {
      id: "b10",
      name: "Oats Porridge",
      price: 30,
      image: "https://www.shutterstock.com/shutterstock/photos/2064829592/display_1500/stock-photo-oatmeal-bowl-oat-porridge-with-banana-blueberry-walnut-chia-seeds-and-almond-milk-for-healthy-2064829592.jpg",
      category: "breakfast",
      description: "Healthy oats cooked with milk, topped with nuts",
    },

    // LUNCH (10)
    {
      id: "l1",
      name: "Idli Sambhar",
      price: 40,
      image: "https://images.unsplash.com/photo-1670432320633-08b1959aa883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWRseXxlbnwwfHwwfHx8MA%3D%3D",
      category: "lunch",
      description: "Steamed rice cakes served with lentil curry",
      available: false,
      unavailableReason: "Not available in Jain",
    },
    {
      id: "l2",
      name: "Regular Thali",
      price: 80,
      image: "https://images.unsplash.com/photo-1711153419402-336ee48f2138?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "lunch",
      description: "Complete meal with rice, dal, vegetables, roti and pickle",
    },
    {
      id: "l3",
      name: "Biryani",
      price: 120,
      image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
      category: "lunch",
      description: "Fragrant basmati rice with spiced vegetables and herbs",
    },
    {
      id: "l4",
      name: "Dal Rice",
      price: 60,
      image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhbCUyMHJpY2V8ZW58MHx8MHx8fDA%3D",
      category: "lunch",
      description: "Comforting lentil curry served with steamed rice",
    },
    {
      id: "l5",
      name: "Rajma Chawal",
      price: 70,
      image: "https://t4.ftcdn.net/jpg/10/13/43/19/240_F_1013431972_fWPuctwLIIuus7zvNP5LVXa1taJDgp1r.jpg",
      category: "lunch",
      description: "Red kidney beans curry with aromatic basmati rice",
    },
    {
      id: "l6",
      name: "Chole Bhature",
      price: 85,
      image: "https://t3.ftcdn.net/jpg/16/20/42/36/360_F_1620423605_tV0QaXOlFL0rnIeEGiG6c7m5kez0fbtS.webp",
      category: "lunch",
      description: "Spicy chickpea curry with deep-fried bread",
    },
    {
      id: "l7",
      name: "Paneer Butter Masala",
      price: 110,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
      category: "lunch",
      description: "Cottage cheese in rich tomato and butter gravy",
    },
    {
      id: "l8",
      name: "Fish Curry Rice",
      price: 130,
      image: "https://media.istockphoto.com/id/1421262778/photo/goa-food-indian-traditional-goan-pomfret-or-butter-fish-curry-hot-and-spicy-homemade-fish.jpg?s=612x612&w=0&k=20&c=eC_kOB7AVTZ6MMtnCu0jYAMbiscQiAPe_ILHMy9O5Nw=",
      category: "lunch",
      description: "Fresh fish cooked in coconut curry with rice",
      available: false,
      unavailableReason: "Not available in Jain",
    },
    {
      id: "l9",
      name: "Veg Pulav",
      price: 65,
      image: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnJTIwYmlyaXlhbml8ZW58MHx8MHx8fDA%3D",
      category: "lunch",
      description: "Basmati rice stir fried with assorted vegetables",
    },
    {
      id: "l10",
      name: "Methi Thepla & Curd",
      price: 60,
      image: "https://www.shutterstock.com/shutterstock/photos/2580562355/display_1500/stock-photo-methi-thepla-traditional-gujarati-vegetarian-breakfast-with-fenugreeek-leaves-and-wheat-flour-2580562355.jpg",
      category: "lunch",
      description: "Spicy fenugreek flatbreads served with cool yogurt",
    },

    // EVENING SNACKS (10)
    {
      id: "s1",
      name: "Khaman Dhokla",
      price: 55,
      image: "https://images.unsplash.com/photo-1714799263291-272975db795a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGhva2xhfGVufDB8fDB8fHww",
      category: "evening-snacks",
      description: "Steamed gram flour sponge cake with tempering",
      available: false,
      unavailableReason: "Not available in Jain",
    },
    {
      id: "s2",
      name: "Samosa",
      price: 20,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Crispy pastry filled with spiced potatoes and peas",
    },
    {
      id: "s3",
      name: "Pakora",
      price: 35,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Mixed vegetable fritters with mint chutney",
    },
    {
      id: "s4",
      name: "Pav Bhaji",
      price: 65,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Spiced mashed vegetables served with buttered bread",
    },
    {
      id: "s5",
      name: "Chaat",
      price: 45,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Tangy street food with crispy base and chutneys",
    },
    {
      id: "s6",
      name: "Kachori",
      price: 30,
      image: "https://images.unsplash.com/photo-1591465619339-60fce055bc82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FjaG9yaXxlbnwwfHwwfHx8MA%3D%3D",
      category: "evening-snacks",
      description: "Deep-fried pastry with spiced lentil filling",
    },
    {
      id: "s7",
      name: "Spring Rolls",
      price: 55,
      image: "https://images.unsplash.com/photo-1669340781012-ae89fbac9fc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3ByaW5nJTIwUm9sbHN8ZW58MHx8MHx8fDA%3D",
      category: "evening-snacks",
      description: "Crispy rolls filled with fresh vegetables",
    },
    {
      id: "s8",
      name: "Momos",
      price: 50,
      image: "https://plus.unsplash.com/premium_photo-1673769108070-580fe90b8de7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9tb3xlbnwwfHwwfHx8MA%3D%3D",
      category: "evening-snacks",
      description: "Steamed dumplings with spicy tomato chutney",
    },
    {
      id: "s9",
      name: "Dabeli",
      price: 40,
      image: "https://pipingpotcurry.com/wp-content/uploads/2023/05/Dabeli-Recipe-Piping-Pot-Curry.jpg",
      category: "evening-snacks",
      description: "Kutchi street food with potato masala in bun and peanuts",
    },
    {
      id: "s10",
      name: "Masala Corn",
      price: 30,
      image: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ybnxlbnwwfHwwfHx8MA%3D%3D",
      category: "evening-snacks",
      description: "Sweet corn kernels tossed in butter, lime and masala",
    },

    // SIDES (10)
    {
      id: "si1",
      name: "French Fries",
      price: 40,
      image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop",
      category: "sides",
      description: "Golden crispy potato fries with seasoning",
    },
    {
      id: "si2",
      name: "Garlic Bread",
      price: 35,
      image: "https://plus.unsplash.com/premium_photo-1711752902321-ef7b72b28b26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2FybGljJTIwQnJlYWR8ZW58MHx8MHx8fDA%3D",
      category: "sides",
      description: "Toasted bread with garlic butter and herbs",
    },
    {
      id: "si3",
      name: "Caesar Salad",
      price: 70,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      category: "sides",
      description: "Fresh lettuce with caesar dressing and croutons",
    },
    {
      id: "si4",
      name: "Onion Rings",
      price: 45,
      image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop",
      category: "sides",
      description: "Crispy battered onion rings with dipping sauce",
    },
    {
      id: "si5",
      name: "Raita",
      price: 25,
      image: "https://images.unsplash.com/photo-1630409346699-79481a79db52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVybWlsa3xlbnwwfHwwfHx8MA%3D%3D",
      category: "sides",
      description: "Cooling yogurt with cucumber and mint",
    },
    {
      id: "si6",
      name: "Papad",
      price: 15,
      image: "https://media.istockphoto.com/id/666595984/photo/indian-snacks-deep-fried-crackers-or-papad-mung-dal-and-urad-dal-papad-an-indian-fried-dish.jpg?s=2048x2048&w=is&k=20&c=S22CnsCtND1qFssEMAFiZ09DYtLy04pK42kkwstSIpI=",
      category: "sides",
      description: "Crispy lentil wafers with cumin seeds",
    },
    {
      id: "si7",
      name: "Pickle",
      price: 10,
      image: "https://images.unsplash.com/photo-1576020301507-5d5a00982053?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGlja2xlfGVufDB8fDB8fHww",
      category: "sides",
      description: "Tangy and spicy mango pickle",
    },
    {
      id: "si8",
      name: "Coleslaw",
      price: 35,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      category: "sides",
      description: "Fresh cabbage and carrot salad with mayo",
    },
    {
      id: "si9",
      name: "Green Salad",
      price: 30,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      category: "sides",
      description: "Sliced cucumber, tomato, carrot and onion rings",
    },
    {
      id: "si10",
      name: "Curd",
      price: 20,
      image: "https://plus.unsplash.com/premium_photo-1666275003961-67e497ad41c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3VyZHxlbnwwfHwwfHx8MA%3D%3D",
      category: "sides",
      description: "Fresh homemade set yogurt",
    },
  ];

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