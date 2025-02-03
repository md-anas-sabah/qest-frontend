import React from "react";
import { Service } from "../../types";
import { useCart } from "../../context/CartContext";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart, removeFromCart, items } = useCart();

  const isInCart = items.some((item) => item.service.id === service.id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(service.id);
    } else {
      addToCart(service);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
      <p className="text-gray-600 mt-2">{service.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            ${service.price.toFixed(2)}
          </span>
          <span className="text-gray-500 ml-2">{service.duration}</span>
        </div>
        <button
          onClick={handleToggleCart}
          className={`px-4 py-2 rounded transition-colors ${
            isInCart
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
