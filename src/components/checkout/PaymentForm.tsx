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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? "/" + v.slice(2, 4) : "");
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-1 block w-full px-3 py-2 bg-white rounded-md border border-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Amount:{" "}
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          type="text"
          required
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              cardNumber: formatCardNumber(e.target.value),
            }))
          }
          className={inputClassName}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            required
            maxLength={5}
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                expiryDate: formatExpiryDate(e.target.value),
              }))
            }
            className={inputClassName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            required
            maxLength={4}
            placeholder="123"
            value={formData.cvv}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
              }))
            }
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2.5 px-4 rounded-md transition-all duration-200 font-medium
          ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
      >
        {loading ? (
          <span className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
