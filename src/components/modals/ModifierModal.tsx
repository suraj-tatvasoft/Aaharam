import React, { useState, useEffect } from 'react';
import { Minus, Plus, X } from 'lucide-react';

interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

interface ModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FoodItem | null;
  onAddToCart: (selectedModifiers: Record<string, string[]>, price: number) => void;
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

const ModifierModal: React.FC<ModifierModalProps> = ({ isOpen, onClose, item, onAddToCart }) => {
  if (!item) return null;
  const { name: itemName, price: basePrice, image, modifiers = [], availableFor = [] } = item;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [cookingNote, setCookingNote] = useState('');
  const [selectedPrepType, setSelectedPrepType] = useState<string>('');

  useEffect(() => {
    setSelectedOptions([]);
    setQuantity(1);
    setCookingNote('');
    if (availableFor && availableFor.length > 0) {
      setSelectedPrepType(availableFor.includes('regular') ? 'regular' : availableFor[0]);
    }
  }, [availableFor]);

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
  };

  const handlePrepTypeChange = (type: string) => {
    setSelectedPrepType(type);
  };

  const calculateTotalPrice = () => {
    const modsPrice = modifiers.filter((mod) => selectedOptions.includes(mod.id)).reduce((sum, mod) => sum + (mod.price || 0), 0);
    return (basePrice + modsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const grouped: Record<string, string[]> = {};
    if (selectedPrepType) {
      grouped['preparationType'] = [selectedPrepType];
    }
    if (selectedOptions.length > 0) {
      grouped['modifiers'] = selectedOptions;
    }
    if (cookingNote.trim()) {
      grouped['note'] = [cookingNote.trim()];
    }
    for (let i = 0; i < quantity; i++) {
      onAddToCart(grouped, calculateTotalPrice() / quantity);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center sm:justify-center" style={{ backdropFilter: 'blur(8px)' }}>
      {/* Floating Close Button */}
      {/* Modal Container */}
      <div className="relative mx-auto flex w-full max-w-md flex-col rounded-tl-[16px] rounded-tr-[16px] bg-white shadow-xl">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-gray-200 p-2 shadow-md hover:bg-gray-100 focus:outline-none"
          style={{ top: '-58px', background: '#F5F5F5' }}
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        {/* Header */}
        <div className="flex items-center pb-3 pl-4 pr-4 pt-4">
          {image && <img src={image} alt={itemName} className="mr-4 h-16 w-16 rounded-xl border object-cover" />}
          <div className="flex-1">
            <div className="text-base font-medium">{itemName}</div>
          </div>
          <div className="text-base font-normal text-gray-800">₹{basePrice}</div>
        </div>
        {/* Preparation Type */}
        {availableFor && availableFor.length > 0 && (
          <>
            <div className="w-full" style={{ background: '#F3F4F6', height: '4px', borderRadius: '2px' }} />
            <div className="p-4">
              <div className="mb-2 text-sm font-semibold">Choice Of Preparation Type</div>
              <div className="mb-3 border-b border-gray-200"></div>
              <div className="flex flex-col gap-1">
                {availableFor.map((type) => (
                  <label key={type} className="group flex cursor-pointer items-center justify-between py-2">
                    <span className="text-sm capitalize text-gray-900">{type}</span>
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        name="prepType"
                        value={type}
                        checked={selectedPrepType === type}
                        onChange={() => handlePrepTypeChange(type)}
                        className="h-5 w-5 appearance-none rounded-full border border-gray-300 transition-colors checked:border-green-600 checked:bg-white focus:outline-none"
                      />
                      {selectedPrepType === type && (
                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600"></span>
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
              <div className="mb-4 text-sm font-semibold">Extra</div>
              <div className="mb-4 border-b border-gray-200"></div>
              <div className="flex flex-col gap-4">
                {modifiers.map((mod) => (
                  <label key={mod.id} className="group flex cursor-pointer items-center">
                    <span className="flex-1 text-sm" style={{ color: '#212121' }}>
                      {mod.name}
                    </span>
                    <span className="ml-2 text-sm" style={{ color: '#212121' }}>
                      ₹{mod.price}
                    </span>
                    <span className="relative ml-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(mod.id)}
                        onChange={() => handleOptionToggle(mod.id)}
                        className="peer h-5 w-5 appearance-none rounded-[4px] border border-gray-300 bg-white transition-colors checked:border-green-600 checked:bg-green-600 focus:outline-none"
                        aria-checked={selectedOptions.includes(mod.id)}
                      />
                      <span className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        {selectedOptions.includes(mod.id) && (
                          <svg className="h-3 w-3 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <label className="mb-2 block text-sm font-medium">Add a cooking note (optional)</label>
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
        <div className="sticky bottom-0 left-0 flex flex-col gap-3 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex w-full gap-3">
              <div
                className="flex h-12 flex-1 items-center justify-between overflow-hidden rounded-lg border"
                style={{ boxSizing: 'border-box', borderColor: '#38963B' }}
              >
                <button
                  className="flex h-full items-center justify-center px-4 py-0 text-2xl font-bold text-green-600 disabled:opacity-40"
                  style={{ minWidth: '32px' }}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                >
                  <Minus />
                </button>
                <span
                  className="flex h-full items-center justify-center bg-white px-4 py-0 text-lg font-semibold"
                  style={{ minWidth: '28px', color: '#38963B' }}
                >
                  {quantity}
                </span>
                <button
                  className="flex h-full items-center justify-center px-4 py-0 text-2xl font-bold text-green-600"
                  style={{ minWidth: '32px' }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus />
                </button>
              </div>
              <button
                className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-lg bg-green-600 text-base font-bold text-white shadow-md transition-colors hover:bg-green-700"
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
