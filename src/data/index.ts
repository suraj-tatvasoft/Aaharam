import { IBulkPassMenu } from '@/types';
import thaliImg from '@/assets/regular-thali.jpg';

export const BulkPassMenu: IBulkPassMenu[] = [
  {
    title: 'Regular Thali',
    description: '4 Butter Roti, 2 Sabji, Gujrati Dal, Bhat, Salad, Mango Juice',
    image: thaliImg,
    start_date: '',
    end_date: '',
    price: {
      original: 1760,
      discounted: 1540,
      currency: 'INR',
    },
  },
  {
    title: 'Regular Thali',
    subtitle: 'with buttermilk',
    description: '4 Butter Roti, 2 Sabji, Gujrati Dal, Bhat, Salad, Mango Juice',
    image: thaliImg,
    start_date: '',
    end_date: '',
    price: {
      original: 1980,
      discounted: 1760,
      currency: 'INR',
    },
  },
];
