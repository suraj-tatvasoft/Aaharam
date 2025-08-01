import regularThaliImage from "@/assets/regular-thali.jpg";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal = ({ isOpen, onClose }: MenuModalProps) => {
  const menuItems = [
    { name: "Butter Roti", quantity: 4 },
    { name: "Sev Tamatar", quantity: 1 },
    { name: "Mix Kathol", quantity: 1 },
    { name: "Dal", quantity: 1 },
    { name: "Rice", quantity: 1 },
  ];

  if (!isOpen) return null;

  return (
    <div style={{ backdropFilter: "blur(8px)" }} className="fixed inset-0 bg-black/50 z-50 flex sm:items-center sm:justify-center p-0 sm:p-4">
      {/* Desktop modal */}
      <div className="hidden sm:block bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold">Today's Lunch Menu</h3>
            <p className="text-sm text-muted-foreground mt-1">11th July 25, Monday</p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Thali Image and Price */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img 
                src={regularThaliImage} 
                alt="Regular Thali"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Regular Thali</h3>
            </div>
            <span className="text-lg font-bold">₹80</span>
          </div>
          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
            ))}
          </div>
          {/* Add Button */}
          <button
            className="w-full py-3 px-4 bg-white text-green-600 border border-green-500 rounded-xl font-medium text-base hover:bg-green-50 transition-colors"
            onClick={onClose}
          >
            Add item
          </button>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {/* Mobile bottom sheet */}
      <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Close button above modal, centered */}
        <div className="flex justify-center -mb-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none relative z-10"
            style={{ top: '-28px' }}
          >
            <svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L4.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.5 4.5L13.5 13.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-t-2xl pt-3 pb-6 px-4 shadow-2xl">
  
          {/* Heading and date */}
          <div className="flex items-center justify-between mb-3 mt-2">
            <h3 className="text-base font-semibold">Today's Lunch Menu</h3>
            <span className="text-xs text-muted-foreground">11th July 25, Monday</span>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200 mb-3" />
          {/* Thali image, name, price */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img
                src={regularThaliImage}
                alt="Regular Thali"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Regular Thali</h3>
            </div>
            <span className="text-base font-bold">₹80</span>
          </div>
          {/* Menu Items */}
          <div className="space-y-2 mb-6">
            {menuItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
            ))}
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200 mb-4" />
          {/* Add Button */}
          <button
            className="w-full py-3 px-4 bg-white text-green-600 border border-green-500 rounded-xl font-medium text-base hover:bg-green-50 transition-colors"
            onClick={onClose}
          >
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;