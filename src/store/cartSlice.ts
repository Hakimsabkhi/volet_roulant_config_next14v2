import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  devisNumber: string;
  totalHT: number;
  totalTTC: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
