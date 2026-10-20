import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { RootState, AppDispatch } from '../store';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 45 },
  { id: 3, name: 'Keyboard ', price: 120 },
  { id: 4, name: 'Monitor', price: 350 },
  { id: 5, name: 'USB', price: 15 },
];

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleAddProduct = () => {
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View>
      <Text >🛒 Giỏ Hàng</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Giỏ hàng đang trống</Text>}
        renderItem={({ item }) => (
          <View>
            <View>
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => handleRemoveProduct(item.id)}
            >
              <Text>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View>
        <TouchableOpacity  onPress={handleAddProduct}>
          <Text>+ Thêm Sản Phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => dispatch(clearCart())}>
          <Text>🗑️ Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>
      <View >
        <Text>Tổng: ${total}</Text>
      </View>
    </View>
  );
}

