"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Budget() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", limit: 200, spent: 120 },
    { id: 2, category: "Entertainment", limit: 150, spent: 80 },
    { id: 3, category: "Bills", limit: 500, spent: 400 },
    { id: 4, category: "Savings", limit: 300, spent: 200 },
  ]);

  const [form, setForm] = useState({ category: "", limit: "" });

  // Update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new budget category
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.category || !form.limit) return;
    setBudgets([
      ...budgets,
      {
        id: Date.now(),
        category: form.category,
        limit: parseFloat(form.limit),
        spent: 0,
      },
    ]);
    setForm({ category: "", limit: "" });
  };

  // Calculate total limit and total spent
  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

  // Calculate percentage spent per category
  const getPercentage = (spent, limit) => {
    if (limit === 0) return 0;
    return Math.min((spent / limit) * 100, 100);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`flex-1 transition-all duration-300 p-10 ${
          sidebarOpen ? "ml-72" : "ml-28"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Budget Dashboard</h2>

        {/* Total Summary */}
        <div className="mb-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 text-center">
          <p className="text-gray-500 font-medium">Total Budget Used</p>
          <p className="text-3xl font-bold text-pink-600">
            ${totalSpent.toLocaleString()} / ${totalLimit.toLocaleString()}
          </p>
        </div>

        {/* Add Budget Form */}
        <form
          onSubmit={handleAdd}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center mb-6"
        >
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white/80 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="number"
            name="limit"
            placeholder="Monthly Limit"
            value={form.limit}
            onChange={handleChange}
            className="w-40 border border-gray-300 rounded-lg px-4 py-2 bg-white/80 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Add
          </button>
        </form>

        {/* Budget Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => {
            const percentage = getPercentage(b.spent, b.limit);
            let progressColor = "bg-green-500";
            if (percentage > 80) progressColor = "bg-red-500";
            else if (percentage > 50) progressColor = "bg-yellow-400";

            return (
              <div
                key={b.id}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{b.category}</h3>
                <p className="text-gray-600 mb-1">
                  ${b.spent.toLocaleString()} / ${b.limit.toLocaleString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${progressColor} h-4 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{Math.round(percentage)}% used</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
