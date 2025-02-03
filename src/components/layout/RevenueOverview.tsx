import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { X, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import { services } from "../../data/services";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface RevenueOverviewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryRevenue {
  [key: string]: number;
}

interface ChartDataItem {
  category: string;
  revenue: number;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const categoryRevenue = services.reduce<CategoryRevenue>((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = 0;
    }
    acc[service.category] += service.price;
    return acc;
  }, {});

  const chartData: ChartDataItem[] = Object.entries(categoryRevenue).map(
    ([category, revenue]) => ({
      category,
      revenue,
    })
  );

  const totalRevenue = Object.values(categoryRevenue).reduce(
    (a, b) => a + b,
    0
  );
  const avgServicePrice = totalRevenue / services.length;
  const mostExpensiveService = services.reduce<Service>((prev, current) =>
    prev.price > current.price ? prev : current
  );

  const servicesByCategory = services.reduce<CategoryRevenue>(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = 0;
      }
      acc[service.category]++;
      return acc;
    },
    {}
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Revenue Overview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-medium">
                Total Revenue Potential
              </span>
            </div>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">
                Average Service Price
              </span>
            </div>
            <p className="text-2xl font-bold">${avgServicePrice.toFixed(2)}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="h-5 w-5 text-purple-600" />
              <span className="text-purple-600 font-medium">
                Total Services
              </span>
            </div>
            <p className="text-2xl font-bold">{services.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Revenue by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`$${value}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-4 border-t">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Category Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(servicesByCategory).map(([category, count]) => (
              <div
                key={category}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{category}</p>
                  <p className="text-sm text-gray-600">{count} services</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ${categoryRevenue[category].toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Most Expensive Service */}
        <div className="p-4 border-t">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Premium Service Spotlight
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Most Expensive Service</p>
            <p className="text-xl font-semibold text-gray-900">
              {mostExpensiveService.name}
            </p>
            <p className="text-blue-600 font-bold">
              ${mostExpensiveService.price}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {mostExpensiveService.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
