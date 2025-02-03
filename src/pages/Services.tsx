// import React, { useState } from "react";
// import { ServiceCard } from "../components/services/ServiceCard";
// import { services } from "../data/services";

// export const ServicesPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const categories = Array.from(
//     new Set(services.map((service) => service.category))
//   );

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = service.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       !selectedCategory || service.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header Section */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Our Services
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Discover our range of professional services tailored to meet your
//             needs
//           </p>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="max-w-4xl mx-auto mb-12">
//           <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
//             {/* Search Input */}
//             <div className="flex-grow relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
//               />
//             </div>

//             {/* Category Select */}
//             <div className="md:w-64">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <div className="mb-4">
//                 <svg
//                   className="mx-auto h-12 w-12 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-1">
//                 No services found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search or filter to find what you're looking
//                 for.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Results Counter */}
//         {filteredServices.length > 0 && (
//           <div className="mt-8 text-center text-sm text-gray-600">
//             Showing {filteredServices.length}{" "}
//             {filteredServices.length === 1 ? "service" : "services"}
//             {selectedCategory && ` in ${selectedCategory}`}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;

import React, { useState } from "react";
import { ServiceCard } from "../components/services/ServiceCard";
import { services } from "../data/services";
import CustomDropdown from "../components/services/CustomDropdown";


export const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = Array.from(
    new Set(services.map((service) => service.category))
  );

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of professional services tailored to meet your
            needs
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Custom Category Dropdown */}
            <div className="md:w-64">
              <CustomDropdown
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="All Categories"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No services found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>

        {/* Results Counter */}
        {filteredServices.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing {filteredServices.length}{" "}
            {filteredServices.length === 1 ? "service" : "services"}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
