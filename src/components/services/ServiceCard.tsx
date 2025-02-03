import React from "react";
import { Service } from "../../types";
import { useCart } from "../../context/CartContext";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();

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
          onClick={() => addToCart(service)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
