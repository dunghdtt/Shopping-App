import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem{
    id: number;
    name: string;
    price: number;
    quantity: number;
};
interface CartState{
    items: CartItem[];
};
const initialState: CartState ={
    items: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      // 1. addToCart
      addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if(index >= 0){
            state.items[index].quantity += 1;
        } else{
            state.items.push({...action.payload, quantity: 1});
        }
      },
      
      // 2. removeFromCart
      removeFromCart: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item)=>item.id !== action.payload);
      },
      
      // 3. updateQuantity
      updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const { id, quantity } = action.payload;
   
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
          return;
        }
   
        const index = state.items.findIndex((item) => item.id === id);
        if (index >= 0) {
          state.items[index].quantity = quantity;
        }
      },
      
      // 4. clearCart
      clearCart: (state) => {
        state.items = [];
      },
    },
  });
  export const {addToCart, removeFromCart,updateQuantity, clearCart} = cartSlice.actions;
  export default cartSlice.reducer;