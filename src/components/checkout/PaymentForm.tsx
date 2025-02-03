import React, { useState } from "react";

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  total: number;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  total,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium">
          Total Amount: ${total.toFixed(2)}
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          required
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cardNumber: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            required
            placeholder="123"
            value={formData.cvv}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, cvv: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Holder Name
        </label>
        <input
          type="text"
          required
          placeholder="John Doe"
          value={formData.cardHolder}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cardHolder: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};
