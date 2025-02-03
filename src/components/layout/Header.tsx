import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Grid } from "lucide-react";

export const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Service POS
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Grid size={20} />
              <span>Services</span>
            </Link>

            <Link
              to="/checkout"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart size={20} />
              <span>Cart ({itemCount})</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
