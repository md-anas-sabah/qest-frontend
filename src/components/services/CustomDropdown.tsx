import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select category",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowUp":
        setHighlighted((prev) => Math.max(prev - 1, 0));
        break;
      case "ArrowDown":
        setHighlighted((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "Enter":
        if (highlighted >= 0) {
          onChange(options[highlighted]);
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="relative w-full"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Selected Value Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2.5 bg-white border rounded-lg cursor-pointer
          ${
            isOpen
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-gray-300 hover:border-gray-400"
          }
          transition-all duration-200`}
      >
        <span className={`${!value ? "text-gray-500" : "text-gray-900"}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200
            ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn">
          <div className="py-1 max-h-60 overflow-auto">
            <div
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={`flex items-center px-4 py-2 cursor-pointer
                ${
                  value === "" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                }
              `}
            >
              <span className="flex-grow">All Categories</span>
              {value === "" && <Check className="w-4 h-4 ml-2" />}
            </div>
            {options.map((option, index) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex items-center px-4 py-2 cursor-pointer
                  ${highlighted === index ? "bg-gray-50" : ""}
                  ${
                    value === option
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <span className="flex-grow">{option}</span>
                {value === option && <Check className="w-4 h-4 ml-2" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
