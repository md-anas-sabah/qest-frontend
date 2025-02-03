// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { ShoppingCart, Grid } from "lucide-react";

// export const Header: React.FC = () => {
//   const { items } = useCart();
//   const [isAnimating, setIsAnimating] = useState(false);
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   useEffect(() => {
//     if (items.length > 0) {
//       setIsAnimating(true);

//       const timer = setTimeout(() => {
//         setIsAnimating(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [items.length]);

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             Service POS
//           </Link>

//           <div className="flex items-center gap-6">
//             <Link
//               to="/"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//             >
//               <Grid size={20} />
//               <span>Services</span>
//             </Link>

//             <Link
//               to="/checkout"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 relative"
//             >
//               <div
//                 className={`${
//                   isAnimating
//                     ? "animate-cart-attention text-blue-600"
//                     : "transform transition-colors duration-300"
//                 }`}
//               >
//                 <ShoppingCart size={20} />
//               </div>
//               <span
//                 className={`${
//                   isAnimating ? "text-blue-600 font-medium" : ""
//                 } transition-colors duration-300`}
//               >
//                 {itemCount > 0 ? `(${itemCount})` : ""}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Grid, BarChart } from "lucide-react";
import RevenueOverview from "./RevenueOverview";

export const Header: React.FC = () => {
  const { items } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (items.length > 0) {
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [items.length]);

  return (
    <>
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

              <button
                onClick={() => setIsRevenueModalOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <BarChart size={20} />
                <span>Revenue</span>
              </button>

              <Link
                to="/checkout"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 relative"
              >
                <div
                  className={`${
                    isAnimating
                      ? "animate-cart-attention text-blue-600"
                      : "transform transition-colors duration-300"
                  }`}
                >
                  <ShoppingCart size={20} />
                </div>
                <span
                  className={`${
                    isAnimating ? "text-blue-600 font-medium" : ""
                  } transition-colors duration-300`}
                >
                  {itemCount > 0 ? `(${itemCount})` : ""}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <RevenueOverview
        isOpen={isRevenueModalOpen}
        onClose={() => setIsRevenueModalOpen(false)}
      />
    </>
  );
};
