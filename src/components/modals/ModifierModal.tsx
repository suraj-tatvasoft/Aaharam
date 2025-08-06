import React, { useState, useEffect } from "react";
import { Minus, Plus, X, Check } from "lucide-react";

interface ModifierOption {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
}

interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  min: number;
  max: number;
  options: ModifierOption[];
}

interface ModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  price: number;
  image?: string;
  modifiers: ModifierGroup[];
  onAddToCart: (selectedModifiers: Record<string, string[]>) => void;
}

interface SelectedOption {
  groupId: string;
  optionId: string;
  name: string;
  price: number;
}

const ModifierModal: React.FC<ModifierModalProps> = ({
  isOpen,
  onClose,
  itemName,
  price: basePrice,
  image,
  modifiers,
  onAddToCart,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  // Initialize expanded groups state
  useEffect(() => {
    const initialExpandedState: Record<string, boolean> = {};
    modifiers.forEach((group) => {
      initialExpandedState[group.id] = true; // Start with all groups expanded
    });
    setExpandedGroups(initialExpandedState);
  }, [modifiers]);

  // Initialize default selections for required modifiers
  useEffect(() => {
    const defaultSelections: SelectedOption[] = [];

    modifiers.forEach((group) => {
      if (group.required && group.options.length > 0) {
        // Select the first option by default for required groups
        const defaultOption = group.options[0];
        defaultSelections.push({
          groupId: group.id,
          optionId: defaultOption.id,
          name: defaultOption.name,
          price: defaultOption.price,
        });
      }
    });

    setSelectedOptions(defaultSelections);
  }, [modifiers]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleOptionSelect = (groupId: string, option: ModifierOption) => {
    setSelectedOptions((prev) => {
      const group = modifiers.find((g) => g.id === groupId);
      if (!group) return prev;

      // For single-select groups, replace any existing selection for this group
      if (group.max === 1) {
        return [
          ...prev.filter((opt) => opt.groupId !== groupId),
          {
            groupId,
            optionId: option.id,
            name: option.name,
            price: option.price,
          },
        ];
      }

      // For multi-select groups, toggle the selection
      const existingIndex = prev.findIndex(
        (opt) => opt.groupId === groupId && opt.optionId === option.id
      );

      if (existingIndex >= 0) {
        // Remove if already selected
        return prev.filter((_, i) => i !== existingIndex);
      } else {
        // Add new selection, respecting max limit
        const groupSelections = prev.filter((opt) => opt.groupId === groupId);
        if (groupSelections.length >= (group.max || Infinity)) {
          // If max selections reached, replace the first one
          return [
            ...prev.filter((opt) => opt.groupId !== groupId),
            {
              groupId,
              optionId: option.id,
              name: option.name,
              price: option.price,
            },
            ...groupSelections.slice(1),
          ];
        } else {
          // Add new selection
          return [
            ...prev,
            {
              groupId,
              optionId: option.id,
              name: option.name,
              price: option.price,
            },
          ];
        }
      }
    });
  };

  const isOptionSelected = (groupId: string, optionId: string) => {
    return selectedOptions.some(
      (opt) => opt.groupId === groupId && opt.optionId === optionId
    );
  };

  const calculateTotalPrice = () => {
    const optionsTotal = selectedOptions.reduce(
      (sum, option) => sum + option.price,
      0
    );
    return (basePrice + optionsTotal) * quantity;
  };

  const handleAddToCart = () => {
    // Group selected options by modifier group
    const selectedModifiers: Record<string, string[]> = {};

    selectedOptions.forEach((option) => {
      if (!selectedModifiers[option.groupId]) {
        selectedModifiers[option.groupId] = [];
      }
      selectedModifiers[option.groupId].push(option.optionId);
    });

    onAddToCart(selectedModifiers);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl rounded-b-lg shadow-xl">
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-center p-2 bg-white">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Item header */}
          <div className="flex items-start mb-4">
            {image && (
              <div className="w-16 h-16 mr-3 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={itemName}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{itemName}</h3>
              <p className="text-sm text-gray-500">Customize your order</p>
            </div>
            <div className="text-lg font-semibold">₹{basePrice}</div>
          </div>

          {/* Modifier groups */}
          <div className="space-y-6">
            {modifiers.map((group) => (
              <div key={group.id} className="mb-6">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex items-center justify-between w-full mb-2 text-sm font-medium text-gray-700"
                >
                  <span>{group.name}</span>
                  {group.required && (
                    <span className="text-xs text-gray-500">Required</span>
                  )}
                </button>

                {expandedGroups[group.id] && (
                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleOptionSelect(group.id, option)}
                        className={`flex items-center justify-between p-3 text-left border rounded-lg cursor-pointer ${
                          isOptionSelected(group.id, option.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          {group.max > 1 ? (
                            <div
                              className={`flex items-center justify-center w-5 h-5 border rounded ${
                                isOptionSelected(group.id, option.id)
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isOptionSelected(group.id, option.id) && (
                                <Check size={14} />
                              )}
                            </div>
                          ) : (
                            <div
                              className={`flex items-center justify-center w-5 h-5 border rounded-full ${
                                isOptionSelected(group.id, option.id)
                                  ? 'border-green-500 border-4'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isOptionSelected(group.id, option.id) && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                            </div>
                          )}
                          <span className="ml-3 text-sm">{option.name}</span>
                        </div>
                        {option.price > 0 && (
                          <span className="text-sm text-gray-600">
                            +₹{option.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between p-3 my-6 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Item - ₹{calculateTotalPrice()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifierModal;
