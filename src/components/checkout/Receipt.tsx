import React from "react";
import { jsPDF } from "jspdf";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  service: Service;
  quantity: number;
}

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
  const downloadPDF = () => {
    // Note: You'll need to install jspdf with: npm install jspdf

    const doc = new jsPDF();

    // Set initial y position for content
    let y = 20;

    // Add company logo or name
    doc.setFontSize(20);
    doc.setTextColor(0, 128, 0); // Green color for header
    doc.text("Payment Receipt", 105, y, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Add transaction details
    y += 20;
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transactionId}`, 20, y);
    y += 10;
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, y);

    // Add customer information
    y += 20;
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Customer Information", 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    doc.text(`Name: ${customer.name}`, 20, y);
    y += 8;
    doc.text(`Email: ${customer.email}`, 20, y);
    y += 8;
    doc.text(`Phone: ${customer.phone}`, 20, y);

    // Add order summary
    y += 20;
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Order Summary", 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.setFont(undefined, "normal");

    // Add table headers
    doc.line(20, y, 190, y); // Add line above headers
    y += 8;
    doc.text("Item", 20, y);
    doc.text("Qty", 130, y);
    doc.text("Price", 160, y);
    y += 4;
    doc.line(20, y, 190, y); // Add line below headers

    // Add items
    y += 8;
    items.forEach((item) => {
      doc.text(item.service.name, 20, y);
      doc.text(item.quantity.toString(), 130, y);
      doc.text(`$${(item.service.price * item.quantity).toFixed(2)}`, 160, y);
      y += 8;
    });

    // Add total
    y += 4;
    doc.line(20, y, 190, y);
    y += 8;
    doc.setFont(undefined, "bold");
    doc.text("Total:", 130, y);
    doc.text(`$${total.toFixed(2)}`, 160, y);

    // Save PDF
    doc.save(`receipt-${transactionId}.pdf`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Transaction Details</h3>
        <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
        <p className="text-sm text-gray-600">
          Date: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Customer Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">{customer.name}</p>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <p className="text-sm text-gray-600">{customer.phone}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.service.id}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-700">
                  {item.service.name} x {item.quantity}
                </span>
                <span className="text-gray-900 font-medium">
                  ${(item.service.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onFinish}
          className="bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Return to Services
        </button>
        <button
          onClick={downloadPDF}
          className="bg-white text-blue-600 py-2.5 px-4 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Receipt;
