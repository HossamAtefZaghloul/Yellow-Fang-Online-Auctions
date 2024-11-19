"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Gavel } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../store/notificationSlice";
import { RootState } from "../store";

type NavItem = {
  title: string;
  items: string[];
};

const navItems: NavItem[] = [
  { title: "Jewelry", items: ["Necklaces", "Rings", "Earrings", "Bracelets"] },
  {
    title: "Collectibles",
    items: ["Coins", "Stamps", "Trading Cards", "Figurines"],
  },
  { title: "Furniture", items: ["Chairs", "Tables", "Sofas", "Cabinets"] },
  {
    title: "Asian Art",
    items: ["Paintings", "Sculptures", "Ceramics", "Textiles"],
  },
  {
    title: "Watches",
    items: ["Luxury", "Vintage", "Smart Watches", "Accessories"],
  },
  {
    title: "Books",
    items: ["Fiction", "Non-Fiction", "Rare Books", "Manuscripts"],
  },
];

export default function Component() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="w-full border-t-2 border-b-2 p-2">
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-500 hover:text-gray-600"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <ul className="mt-2 space-y-2 md:hidden">
          {navItems.map((item, index) => (
            <li key={item.title}>
              <button
                onClick={() =>
                  setHoveredIndex(hoveredIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-2 text-left"
                aria-expanded={hoveredIndex === index}
              >
                {item.title}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    hoveredIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {hoveredIndex === index && (
                <ul className="ml-4 mt-2 space-y-2">
                  {item.items.map((subItem) => (
                    <li key={subItem}>
                      <a
                        href="#"
                        className="block p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {isAdmin === "admin" && (
            <Link href="/startauction" className="flex items-center">
              <Gavel />
              Start Auction
            </Link>
          )}
        </ul>
      )}

      {/*Desktop*/}
      <ul className="hidden md:flex w-full justify-center items-center gap-4">
        {navItems.map((item, index) => (
          <li
            key={item.title}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button
              className="flex items-center gap-1 border-l-2 border-r-2 p-2"
              aria-haspopup="true"
              aria-expanded={hoveredIndex === index}
            >
              {item.title} <ChevronDown className="h-4 w-4" />
            </button>
            {hoveredIndex === index && (
              <ul
                className="absolute left-0  w-48 rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out"
                role="menu"
              >
                {item.items.map((subItem) => (
                  <li key={subItem} role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-color"
                      role="menuitem"
                    >
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {isAdmin === "admin" && (
          <Link href="/startauction" className="flex items-center">
            <Gavel />
            Start Auction
          </Link>
        )}
        <button
          onClick={() => dispatch(showNotification("Hello from Route A!"))}
        >
          Trigger Notification
        </button>
      </ul>
    </nav>
  );
}
