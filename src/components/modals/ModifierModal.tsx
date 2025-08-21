import React, { useState, useEffect } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

// Animated Number Component
const AnimatedNumber = ({ value, direction }: { value: number; direction?: 'up' | 'down' }) => {
  return (
    <div className="relative w-6 h-[22px] overflow-hidden">
      <div
        key={`${value}-${direction}`}
        className={`absolute inset-0 flex items-center justify-center text-center font-medium text-[#38963B] transition-transform duration-200 ease-out ${
          direction === 'down' ? 'animate-in slide-in-from-top' : 'animate-in slide-in-from-bottom'
        }`}
      >
        {value}
      </div>
    </div>
  );
};

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
  const [isClosing, setIsClosing] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(1);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  
  // Lock body scroll when modal is open
  useBodyScrollLock(isOpen);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  useEffect(() => {
    setSelectedOptions([]);
    setQuantity(1);
    setCookingNote('');
    if (availableFor && availableFor.length > 0) {
      setSelectedPrepType(availableFor.includes('regular') ? 'regular' : availableFor[0]);
    }
  }, [availableFor]);
  
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);
  
  // Track quantity changes for animations
  useEffect(() => {
    if (quantity !== prevQuantity) {
      setDirection(quantity > prevQuantity ? 'up' : 'down');
      setPrevQuantity(quantity);
    }
  }, [quantity, prevQuantity]);

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
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/10 sm:justify-center" style={{ backdropFilter: 'blur(5px)' }}>
      {/* Floating Close Button */}
      {/* Modal Container */}
      <div
        className={`relative mx-auto flex w-full max-w-md flex-col rounded-tl-[30px] rounded-tr-[30px] bg-white transition-transform duration-300 ease-out ${
          isClosing ? 'animate-out slide-out-to-bottom' : 'animate-in slide-in-from-bottom'
        }`}
        style={{ boxShadow: '0px -6px 20px 0px #A8A8A866' }}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className={`absolute left-1/2 z-10 -translate-x-1/2 rounded-full p-2 hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-out hover:scale-105 ${
            isClosing ? 'animate-out slide-out-to-bottom' : 'animate-in slide-in-from-bottom'
          }`}
          style={{ top: '-58px', background: '#fff' }}
          aria-label="Close"
        >
          <X className="h-5 w-5" style={{ color: '#212121' }} />
        </button>
        {/* Header */}
        <div className="flex items-center pb-3 pl-4 pr-4 pt-4">
          {image && <img src={image} alt={itemName} className="mr-[10px] h-[46px] w-[46px] rounded-[12px] object-cover" />}
          <div className="flex-1">
            <div className="font-normal text-[#212121]">{itemName}</div>
          </div>
          <div className="text-[14px] font-normal text-[#212121]">₹{basePrice}</div>
        </div>
        <div className="scrollbar-hide max-h-[60vh] overflow-y-auto scroll-smooth">
          {/* Preparation Type */}
          {availableFor && availableFor.length > 0 && (
            <>
              <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
              <div className="p-4">
                <div className="mb-4 text-[14px] font-medium text-[#212121]">Choice Of Preparation Type</div>
                <div className="mb-4 border-b border-[#2121211A]"></div>
                <div className="flex flex-col gap-[14px]">
                  {availableFor.map((type) => (
                    <label key={type} className="group flex cursor-pointer items-center justify-between">
                      <span className="text-sm font-light capitalize text-[#212121]">{type}</span>
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
                          <span className="pointer-events-none absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600"></span>
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
              <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
              <div className="p-4">
                <div className="mb-4 text-[14px] font-medium text-[#212121]">Extra</div>
                <div className="mb-4 border-b border-[#2121211A]" />
                <div className="flex flex-col gap-[14px]">
                  {modifiers.map((mod) => (
                    <label key={mod.id} className="group flex cursor-pointer items-center">
                      <span className="flex-1 text-sm font-light capitalize text-[#212121]" style={{ color: '#212121' }}>
                        {mod.name}
                      </span>
                      <span className="ml-2 text-sm font-light text-[#212121]">₹{mod.price}</span>
                      <span className="relative ml-[6px] flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(mod.id)}
                          onChange={() => handleOptionToggle(mod.id)}
                          className="peer h-5 w-5 appearance-none rounded-[4px] border border-gray-300 bg-white transition-colors checked:border-green-600 checked:bg-green-600 focus:outline-none"
                          aria-checked={selectedOptions.includes(mod.id)}
                        />
                        <span className="pointer-events-none absolute h-5 w-5 left-0 top-0 flex items-center justify-center">
                          {selectedOptions.includes(mod.id) && (
                            <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
          <div className="p-4">
            <label className="mb-2 block text-sm font-normal text-[#212121]">Add a cooking note (optional)</label>
            <textarea
              className="w-full rounded-[10px] border border-[#2121211A] bg-[#ffffff] p-[10px] text-sm placeholder:text-sm focus:outline-green-500"
              style={{ minHeight: '80px' }}
              rows={2}
              placeholder="Add any special instructions..."
              value={cookingNote}
              onChange={(e) => setCookingNote(e.target.value)}
            />
          </div>
          <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 left-0 bg-white p-4">
          <div className="flex w-full gap-[10px]">
            <div className="flex h-[44px] flex-1 items-center justify-between rounded-[8px] border border-[#38963B]">
              <button className="ml-5 disabled:opacity-40" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity === 1}>
                <Minus className="text-[#38963B]" />
              </button>
              <AnimatedNumber value={quantity} direction={direction} />
              <button className="mr-5 disabled:opacity-40" onClick={() => setQuantity((q) => q + 1)}>
                <Plus className="text-[#38963B]" />
              </button>
            </div>
            <button
              className="flex h-[44px] flex-1 items-center justify-center whitespace-nowrap rounded-[8px] bg-[#38963B] text-[16px] font-medium text-white transition-colors"
              onClick={handleAddToCart}
            >
              Add Item - ₹{calculateTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierModal;
