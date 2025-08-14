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
    <div className="fixed inset-0 z-50 flex items-end bg-black/10 sm:items-center sm:justify-center" style={{ backdropFilter: 'blur(2px)' }}>
      {/* Floating Close Button */}
      {/* Modal Container */}
      <div className="relative mx-auto flex w-full max-w-md flex-col rounded-tl-[30px] rounded-tr-[30px] bg-white" style={{ boxShadow: "0px -6px 20px 0px #A8A8A866" }}>
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full  p-2 hover:bg-gray-100 focus:outline-none"
          style={{ top: '-58px', background: '#F5F5F5' }}
          aria-label="Close"
        >
          <X className="h-5 w-5" style={{ color: '#212121' }} />
        </button>
        {/* Header */}
        <div className="flex items-center pb-3 pl-4 pr-4 pt-4">
          {image && <img src={image} alt={itemName} className="mr-[10px] h-[46px] w-[46px] rounded-[12px] object-cover" />}
          <div className="flex-1">
            <div className="text-[#212121] font-normal">{itemName}</div>
          </div>
          <div className="text-[#212121] font-normal text-[14px]">₹{basePrice}</div>
        </div>
        <div className='max-h-[60vh] overflow-y-auto scroll-smooth'>
          {/* Preparation Type */}
          {availableFor && availableFor.length > 0 && (
            <>
              <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
              <div className="p-4">
                <div className="mb-4 text-[#212121] font-medium text-[14px]">Choice Of Preparation Type</div>
                <div className="mb-4 border-b border-[#2121211A]"></div>
                <div className="flex flex-col gap-[14px]">
                  {availableFor.map((type) => (
                    <label key={type} className="group flex cursor-pointer items-center justify-between">
                      <span className="text-sm capitalize text-[#212121] font-light">{type}</span>
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
              <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
              <div className="p-4">
                <div className="mb-4 text-[#212121] font-medium text-[14px]">Extra</div>
                <div className="mb-4 border-b border-[#2121211A]" />
                <div className="flex flex-col gap-[14px]">
                  {modifiers.map((mod) => (
                    <label key={mod.id} className="group flex cursor-pointer items-center">
                      <span className="flex-1 text-sm capitalize text-[#212121] font-light" style={{ color: '#212121' }}>
                        {mod.name}
                      </span>
                      <span className="ml-2 text-sm text-[#212121] font-light">
                        ₹{mod.price}
                      </span>
                      <span className="relative ml-[6px] flex items-center">
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
          <div className="w-full" style={{ background: '#F7F7F7', height: '4px' }} />
          <div className="p-4">
            <label className="mb-2 block text-sm font-normal  text-[#212121]">Add a cooking note (optional)</label>
            <textarea
              className="w-full rounded-[10px] border border-[#2121211A] bg-[#ffffff] p-[10px] text-sm focus:outline-green-500 placeholder:text-sm"
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
            <div
              className="flex h-12 flex-1 items-center justify-between rounded-[8px] border border-[#38963B]"
            >
              <button
                className="disabled:opacity-40 ml-5"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity === 1}
              >
                <Minus className='text-[#38963B]' />
              </button>
              <span className="text-[16px] font-medium text-[#38963B]">
                {quantity}
              </span>
              <button
                className="disabled:opacity-40 mr-5"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className='text-[#38963B]' />
              </button>
            </div>
            <button
              className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-[8px] bg-[#38963B] text-[16px] font-medium text-white transition-colors"
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
