import React, { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";

interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

interface ModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FoodItem | null;
  onAddToCart: (selectedModifiers: Record<string, string[]>) => void;
}

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
  modifiers?: ModifierOption[];
  availableFor?: string[];
  sideTitle?: string;
}



const ModifierModal: React.FC<ModifierModalProps> = ({
  isOpen,
  onClose,
  item,
  onAddToCart,
}) => {
  if (!item) return null;
  const { name: itemName, price: basePrice, image, modifiers = [], availableFor = [] } = item;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [cookingNote, setCookingNote] = useState("");
  const [selectedPrepType, setSelectedPrepType] = useState<string>("");

  useEffect(() => {
    setSelectedOptions([]);
    setQuantity(1);
    setCookingNote("");
    if (availableFor && availableFor.length > 0) {
      setSelectedPrepType(availableFor.includes("regular") ? "regular" : availableFor[0]);
    }
  }, [availableFor]);

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handlePrepTypeChange = (type: string) => {
    setSelectedPrepType(type);
  };

  const calculateTotalPrice = () => {
    const modsPrice = modifiers
      .filter((mod) => selectedOptions.includes(mod.id))
      .reduce((sum, mod) => sum + (mod.price || 0), 0);
    return (basePrice + modsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const grouped: Record<string, string[]> = {};
    if (selectedPrepType) {
      grouped["preparationType"] = [selectedPrepType];
    }
    if (selectedOptions.length > 0) {
      grouped["modifiers"] = selectedOptions;
    }
    if (cookingNote.trim()) {
      grouped["note"] = [cookingNote.trim()];
    }
    for (let i = 0; i < quantity; i++) {
      onAddToCart(grouped);
    }
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/50" style={{ backdropFilter: "blur(8px)" }}>
      {/* Floating Close Button */}
      {/* Modal Container */}
      <div className="relative bg-white rounded-tl-[16px] rounded-tr-[16px] shadow-xl w-full max-w-md mx-auto flex flex-col">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute left-1/2 -translate-x-1/2 rounded-full shadow-md p-2 border border-gray-200 hover:bg-gray-100 focus:outline-none z-10"
          style={{ top: '-58px', background: '#F5F5F5' }}
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        {/* Header */}
        <div className="flex items-center pt-4 pr-4 pb-3 pl-4">
          {image && (
            <img src={image} alt={itemName} className="w-16 h-16 object-cover rounded-xl mr-4 border" />
          )}
          <div className="flex-1">
            <div className="font-medium text-base">{itemName}</div>
          </div>
          <div className="text-base text-gray-800 font-normal">₹{basePrice}</div>
        </div>
        {/* Preparation Type */}
        {availableFor && availableFor.length > 0 && (
          <>
            <div className="w-full" style={{ background: '#F3F4F6', height: '4px', borderRadius: '2px' }} />
            <div className="p-4">
              <div className="font-semibold text-sm mb-2">Choice Of Preparation Type</div>
              <div className="border-b border-gray-200 mb-3"></div>
              <div className="flex flex-col gap-1">
                {availableFor.map((type) => (
                  <label
                    key={type}
                    className="flex items-center justify-between py-2 cursor-pointer group"
                  >
                    <span className="text-gray-900 text-sm capitalize">{type}</span>
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        name="prepType"
                        value={type}
                        checked={selectedPrepType === type}
                        onChange={() => handlePrepTypeChange(type)}
                        className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:border-green-600 checked:bg-white focus:outline-none transition-colors"
                      />
                      {selectedPrepType === type && (
                        <span className="absolute left-1/2 top-1/2 w-3 h-3 bg-green-600 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Extras */}
        {modifiers.length > 0 && (
          <>
            <div className="w-full" style={{ background: '#F3F4F6', height: '4px', borderRadius: '2px' }} />
            <div className="p-4">
              <div className="font-semibold text-sm mb-4">Extra</div>
              <div className="border-b border-gray-200 mb-4"></div>
              <div className="flex flex-col gap-4">
                {modifiers.map((mod) => (
                  <label
                    key={mod.id}
                    className="flex items-center cursor-pointer group"
                  >
                    <span className="flex-1 text-sm" style={{ color: '#212121' }}>{mod.name}</span>
                    <span className="ml-2 text-sm" style={{ color: '#212121' }}>₹{mod.price}</span>
                    <span className="relative flex items-center ml-3">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(mod.id)}
                        onChange={() => handleOptionToggle(mod.id)}
                        className="peer appearance-none h-5 w-5 border border-gray-300 rounded-[4px] transition-colors bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none"
                        aria-checked={selectedOptions.includes(mod.id)}
                      />
                      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        {selectedOptions.includes(mod.id) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 8.5L7 11.5L12 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Cooking Note */}
        <div className="w-full" style={{ background: '#F3F4F6', height: '4px', borderRadius: '2px' }} />
        <div className="p-4">
          <label className="block text-sm font-medium mb-2">Add a cooking note (optional)</label>
          <textarea
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:outline-green-500"
            style={{ minHeight: '80px' }}
            rows={2}
            placeholder="Add any special instructions..."
            value={cookingNote}
            onChange={(e) => setCookingNote(e.target.value)}
          />
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 left-0 bg-white p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex w-full gap-3">
              <div className="flex items-center border justify-between rounded-lg overflow-hidden h-12 flex-1" style={{ boxSizing: 'border-box', borderColor: '#38963B' }} >
                <button
                  className="px-4 py-0 text-green-600 text-2xl font-bold disabled:opacity-40 h-full flex items-center justify-center"
                  style={{ minWidth: '32px' }}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                >
                  <Minus />
                </button>
                <span className="px-4 py-0 text-lg font-semibold bg-white h-full flex items-center justify-center" style={{ minWidth: '28px', color: '#38963B' }}>{quantity}</span>
                <button
                  className="px-4 py-0 text-green-600 text-2xl font-bold h-full flex items-center justify-center"
                  style={{ minWidth: '32px' }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus />
                </button>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-base shadow-md transition-colors h-12 flex-1 flex items-center justify-center whitespace-nowrap"
                onClick={handleAddToCart}
              >
                Add Item - ₹{calculateTotalPrice()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierModal;
