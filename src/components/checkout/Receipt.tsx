import React from "react";
import { Customer, CartItem } from "../../types";

interface ReceiptProps {
  customer: Customer;
  items: CartItem[];
  total: number;
  transactionId: string;
  onFinish: () => void;
}

export const Receipt: React.FC<ReceiptProps> = ({
  customer,
  items,
  total,
  transactionId,
  onFinish,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="border-t border-b py-4">
        <h3 className="font-medium mb-2">Transaction Details</h3>
        <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
        <p className="text-sm text-gray-600">
          Date: {new Date().toLocaleString()}
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Customer Information</h3>
        <p className="text-sm text-gray-600">{customer.name}</p>
        <p className="text-sm text-gray-600">{customer.email}</p>
        <p className="text-sm text-gray-600">{customer.phone}</p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.service.id} className="flex justify-between text-sm">
              <span>
                {item.service.name} x {item.quantity}
              </span>
              <span>${(item.service.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 font-medium flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onFinish}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Return to Services
      </button>
    </div>
  );
};
