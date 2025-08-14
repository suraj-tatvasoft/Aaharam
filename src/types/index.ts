export interface IBulkPassMenu {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  price: {
    original: number;
    discounted: number;
    currency: string;
  };
}

export interface IModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface IFoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  available?: boolean;
  unavailableReason?: string;
  availableFor?: string[];
  modifiers?: IModifierOption[];
  sideTitle?: string;
}
