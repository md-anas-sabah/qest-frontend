import React from "react";
import { CartItem as CartItemType } from "../../types";
import { useCart } from "../../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="flex-grow">
        <h4 className="font-medium">{item.service.name}</h4>
        <p className="text-sm text-gray-600">{item.service.duration}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center border rounded"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border rounded"
        >
          +
        </button>
      </div>
      <div className="w-24 text-right">
        ${(item.service.price * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={() => removeFromCart(item.service.id)}
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  );
};
