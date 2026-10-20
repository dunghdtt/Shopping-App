import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { RootState, AppDispatch } from '../store';

// Mock data sản phẩm (mục XIV)
const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard Mechanical', price: 120 },
  { id: 4, name: 'Monitor LG 27"', price: 350 },
  { id: 5, name: 'USB Cable', price: 15 },
];

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy danh sách sản phẩm từ store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Thêm 1 sản phẩm ngẫu nhiên
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

  // Tổng tiền = Σ price × quantity
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ Hàng</Text>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng đang trống</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>

            <View style={styles.quantityBox}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveProduct(item.id)}
            >
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 2 nút chính */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>+ Thêm Sản Phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={() => dispatch(clearCart())}>
          <Text style={styles.buttonText}>🗑️ Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>

      {/* Tổng tiền */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng: ${total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#666',
    marginTop: 4,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#757575',
    padding: 14,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});