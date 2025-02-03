import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerForm } from "../components/checkout/CustomerForm";
import { useCart } from "../context/CartContext";
import { Customer } from "../types";
import { PaymentForm } from "../components/checkout/PaymentForm";
import { Receipt } from "../components/checkout/Receipt";

type CheckoutStep = "customer" | "payment" | "receipt";

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>("customer");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCustomerSubmit = (customerData: Customer) => {
    setCustomer(customerData);
    setStep("payment");
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a random transaction ID
    const tid = "TRX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTransactionId(tid);
    setStep("receipt");
  };

  const handleFinish = () => {
    clearCart();
    navigate("/");
  };

  if (items.length === 0 && step !== "receipt") {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {["customer", "payment", "receipt"].map((s, index) => (
            <React.Fragment key={s}>
              <div className={`flex flex-col items-center`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : step > s
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-1 capitalize">{s}</span>
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {step === "customer" && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Customer Information
            </h2>
            <CustomerForm onSubmit={handleCustomerSubmit} />
          </>
        )}

        {step === "payment" && customer && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            <PaymentForm onSubmit={handlePaymentSubmit} total={total} />
          </>
        )}

        {step === "receipt" && customer && (
          <Receipt
            customer={customer}
            items={items}
            total={total}
            transactionId={transactionId}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
};
