"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "income",
    category: "general",
    description: "",
    amount: "",
    date: "",
  });
  const [filter, setFilter] = useState("all"); // all, income, expense, bill

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add transaction
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    setTransactions([
      ...transactions,
      { ...form, amount: parseFloat(form.amount) },
    ]);
    setForm({ type: "income", category: "general", description: "", amount: "", date: "" });
  };

  // Filtered transactions for table
  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) =>
          filter === "bill" ? t.category === "bill" : t.type === filter
        );

  // Prepare chart data (monthly income & expense)
  const groupedData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    if (t.type === "expense" || t.category === "bill") acc[month].expense += t.amount;
    return acc;
  }, {});

  const chartData = Object.values(groupedData);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden font-sans">
      {/* Background Gradient Elements */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 rounded-full blur-3xl opacity-20" />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 p-10 relative z-10 ${
          sidebarOpen ? "ml-72" : "ml-28"
        }`}
      >
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports</h1>
          <p className="text-gray-500">Track your income, expenses, and bills</p>
        </header>

        {/* Form Input */}
        <form
          onSubmit={handleAdd}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white/80 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white/80 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          >
            <option value="general">General</option>
            <option value="bill">Bill</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white/80 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-40 border border-gray-300 rounded-lg px-4 py-2 bg-white/80 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white/80 text-gray-700 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Add
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-4 mt-4">
          {["all", "income", "expense", "bill"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-lg font-medium transition ${
                filter === f
                  ? "bg-pink-500 text-white"
                  : "bg-white/70 text-gray-700 hover:bg-pink-400/70"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden mt-6">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100/70 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No transactions.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 hover:bg-gray-50/60 transition"
                  >
                    <td
                      className={`px-4 py-2 font-semibold capitalize ${
                        t.type === "income" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {t.type}
                    </td>
                    <td className="px-4 py-2 capitalize">{t.category}</td>
                    <td className="px-4 py-2">{t.description || "-"}</td>
                    <td className="px-4 py-2">
                      Rp {t.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-2">{t.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Chart Section */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Overview
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="income"
                fill="#22c55e"
                name="Income"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                fill="#ef4444"
                name="Expense/Bill"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
