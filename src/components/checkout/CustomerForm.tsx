import React, { useState } from "react";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customer);
  };

  const inputClassName =
    "mt-1 block w-full px-3 py-2 bg-white rounded-md border border-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          required
          value={customer.name}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, name: e.target.value }))
          }
          className={inputClassName}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={customer.email}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, email: e.target.value }))
          }
          className={inputClassName}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          required
          value={customer.phone}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, phone: e.target.value }))
          }
          className={inputClassName}
          placeholder="+91 (0000) 000-000"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default CustomerForm;
