import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  passType?: string;
  passExpiry?: string;
  preferredLunchTime?: string;
}

const initialState: UserState = {
  id: 1,
  name: 'Dhiren Devganiya',
  email: 'dhiren.devganiya@tatvasoft.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  passType: 'Regular Thali - Without Butter Milk',
  passExpiry: '31st July',
  preferredLunchTime: '',
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
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
