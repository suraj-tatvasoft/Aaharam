export interface IBulkPassMenu {
  title: string;
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
