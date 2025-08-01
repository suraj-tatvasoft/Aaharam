import { useState } from "react";
import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import PromoBar from "@/components/PromoBar";
import FoodCard from "@/components/FoodCard";
import MenuModal from "@/components/modals/MenuModal";
import NotificationModal from "@/components/modals/NotificationModal";
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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();


  const foodItems: FoodItem[] = [
    // BREAKFAST (10)
    {
      id: "b1",
      name: "Masala Tea",
      price: 15,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Aromatic spiced tea with ginger and cardamom",
    },
    {
      id: "b2",
      name: "Poha",
      price: 40,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Flattened rice with onions, curry leaves and spices",
    },
    {
      id: "b3",
      name: "Aloo Paratha",
      price: 45,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Stuffed flatbread with spiced potato filling",
    },
    {
      id: "b4",
      name: "Upma",
      price: 35,
      image: "https://images.unsplash.com/photo-1630409347241-e90d5df6ba78?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Semolina cooked with vegetables and tempering",
    },
    {
      id: "b5",
      name: "Dosa",
      price: 50,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1550418290-a8d86ad67491?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Pearl sago stir fried with potatoes, peanuts and spices",
    },
    {
      id: "b10",
      name: "Oats Porridge",
      price: 30,
      image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=400&h=300&fit=crop",
      category: "breakfast",
      description: "Healthy oats cooked with milk, topped with nuts",
    },
  
    // LUNCH (10)
    {
      id: "l1",
      name: "Idli Sambhar",
      price: 40,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Steamed rice cakes served with lentil curry",
      available: false,
      unavailableReason: "Not available in Jain",
    },
    {
      id: "l2",
      name: "Regular Thali",
      price: 80,
      image: "https://images.unsplash.com/photo-1589308078052-1956fc7c3b99?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Complete meal with rice, dal, vegetables, roti and pickle",
    },
    {
      id: "l3",
      name: "Biryani",
      price: 120,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d29b?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Fragrant basmati rice with spiced vegetables and herbs",
    },
    {
      id: "l4",
      name: "Dal Rice",
      price: 60,
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Comforting lentil curry served with steamed rice",
    },
    {
      id: "l5",
      name: "Rajma Chawal",
      price: 70,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Red kidney beans curry with aromatic basmati rice",
    },
    {
      id: "l6",
      name: "Chole Bhature",
      price: 85,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Spicy chickpea curry with deep-fried bread",
    },
    {
      id: "l7",
      name: "Paneer Butter Masala",
      price: 110,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Cottage cheese in rich tomato and butter gravy",
    },
    {
      id: "l8",
      name: "Fish Curry Rice",
      price: 130,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Fresh fish cooked in coconut curry with rice",
      available: false,
      unavailableReason: "Not available in Jain",
    },
    {
      id: "l9",
      name: "Veg Pulav",
      price: 65,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Basmati rice stir fried with assorted vegetables",
    },
    {
      id: "l10",
      name: "Methi Thepla & Curd",
      price: 60,
      image: "https://images.unsplash.com/photo-1590080877031-2d9497b7cedc?w=400&h=300&fit=crop",
      category: "lunch",
      description: "Spicy fenugreek flatbreads served with cool yogurt",
    },
  
    // EVENING SNACKS (10)
    {
      id: "s1",
      name: "Khaman Dhokla",
      price: 55,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Deep-fried pastry with spiced lentil filling",
    },
    {
      id: "s7",
      name: "Spring Rolls",
      price: 55,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Crispy rolls filled with fresh vegetables",
    },
    {
      id: "s8",
      name: "Momos",
      price: 50,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d29b?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Steamed dumplings with spicy tomato chutney",
    },
    {
      id: "s9",
      name: "Dabeli",
      price: 40,
      image: "https://images.unsplash.com/photo-1610754577240-c14289faa353?w=400&h=300&fit=crop",
      category: "evening-snacks",
      description: "Kutchi street food with potato masala in bun and peanuts",
    },
    {
      id: "s10",
      name: "Masala Corn",
      price: 30,
      image: "https://images.unsplash.com/photo-1447078806655-40579c2520d6?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1619985209132-de7780ac1078?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      category: "sides",
      description: "Cooling yogurt with cucumber and mint",
    },
    {
      id: "si6",
      name: "Papad",
      price: 15,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      category: "sides",
      description: "Crispy lentil wafers with cumin seeds",
    },
    {
      id: "si7",
      name: "Pickle",
      price: 10,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1627308595187-0f2f327c1885?w=400&h=300&fit=crop",
      category: "sides",
      description: "Fresh homemade set yogurt",
    },
  ];
  
  

  

  const filteredItems = foodItems.filter(item => item.category === activeCategory);

  const handleAddItem = (id: string) => {
    const item = foodItems.find(item => item.id === id);
    if (item) {
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
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
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background shadow-lg">
        <Header onMenuClick={() => setIsMenuModalOpen(true)} />
        
        <main className="pb-6">
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <PromoBar />
        
        {/* Food Items List */}
        <div className="p-4 space-y-2 bg-gray-100 w-full">
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
  );
};

export default FoodDelivery;