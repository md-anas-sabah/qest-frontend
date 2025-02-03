import React from "react";
import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.service.id} item={item} />
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
