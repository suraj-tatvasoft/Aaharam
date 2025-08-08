import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFoodItem } from '../../types/index';

interface UserState {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  passType?: string;
  passExpiry?: string;
  preferredLunchTime?: string;
  favorites: IFoodItem[];
}

const initialState: UserState = {
  id: 1,
  name: 'Dhiren Devganiya',
  email: 'dhiren.devganiya@tatvasoft.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  passType: 'Regular Thali - Without Butter Milk',
  passExpiry: '31st July',
  preferredLunchTime: '',
  favorites: [], // Now an array of FoodItem objects
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...action.payload };
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
    addFavorite(state, action: PayloadAction<IFoodItem>) {
      if (!state.favorites.some(item => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
  },
});

export const { setUser, updateUser, clearUser, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
