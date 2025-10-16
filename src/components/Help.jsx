"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Mail, MessageSquare } from "lucide-react";

export default function Help() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 transition-all duration-300 p-10 ${
          sidebarOpen ? "pl-72" : "pl-28"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h2>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-8">
          <p className="text-gray-700 mb-6">
            Need help? Our support team is here for you.  
            Choose one of the following ways to reach out:
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <Mail className="text-pink-500" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">Email Support</h3>
                <p className="text-sm text-gray-500">support@xpay.com</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <MessageSquare className="text-orange-400" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">Live Chat</h3>
                <p className="text-sm text-gray-500">Available 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
