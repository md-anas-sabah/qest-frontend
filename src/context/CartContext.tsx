import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Service } from "../types";


interface CartContextType {
  items: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (service: Service) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.service.id === service.id
      );
      if (existingItem) {
        return currentItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.service.id !== serviceId)
    );
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.service.id === serviceId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.service.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
