"use client";
import {
  LayoutDashboard,
  CreditCard,
  Smartphone,
  FileText,
  HelpCircle,
  User,
  Menu,
  X,
  DollarSign,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, text: "Dashboard", href: "/" },
    { icon: <User size={18} />, text: "About", href: "/about" },
    { icon: <Smartphone size={18} />, text: "Accounts", href: "/accounts" },
    { icon: <DollarSign size={18} />, text: "Budgets", href: "/budgets" },
    { icon: <FileText size={18} />, text: "Reports", href: "/reports" },
    { icon: <HelpCircle size={18} />, text: "Help", href: "/help" },
  ];

  return (
    <aside
      className={`h-screen fixed left-0 top-0 bg-white/70 backdrop-blur-md border-r border-gray-200 shadow-md flex flex-col justify-between transition-all duration-300 z-30 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-lg shadow-sm" />
            {sidebarOpen && (
              <span className="text-lg font-bold text-gray-800">FinReport</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 space-y-1 px-2">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={i}
                to={item.href}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-pink-600 bg-pink-50 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {/* Icon selalu tampil */}
                {item.icon}
                {/* Teks hanya tampil kalau sidebarOpen === true */}
                {sidebarOpen && <span>{item.text}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      {sidebarOpen && (
        <div className="p-4 text-xs text-gray-400">© 2025 xPay Inc.</div>
      )}
    </aside>
  );
}
