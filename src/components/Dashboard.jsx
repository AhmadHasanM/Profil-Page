"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [budget, setBudget] = useState([
    { category: "Food", limit: 500, spent: 320 },
    { category: "Entertainment", limit: 300, spent: 150 },
    { category: "Bills", limit: 700, spent: 550 },
    { category: "Savings", limit: 1000, spent: 400 },
  ]);

  const fetchUser = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    setUser(data.results[0]);
  };

  useEffect(() => {
    fetchUser();
    // Sample account data
    setAccounts([
      { id: 1, name: "Main Account", balance: 2400.5 },
      { id: 2, name: "Savings Account", balance: 10300.75 },
      { id: 3, name: "Business Account", balance: 45200.0 },
    ]);
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);
  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-50 font-sans relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 rounded-full blur-3xl opacity-20" />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`flex-1 transition-all duration-300 p-6 md:p-10 space-y-8 ${
          sidebarOpen ? "md:pl-72" : "md:pl-28"
        }`}
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden bg-pink-500 text-white p-2 rounded-lg shadow-lg fixed top-4 left-4 z-30"
        >
          <Menu size={20} />
        </button>

        {/* Header */}
        <header className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {user.name.first} 👋
            </h2>
            <p className="text-gray-500">Your finance overview</p>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm">
            <img
              src={user.picture.thumbnail}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700 font-medium hidden sm:block">
              {user.name.first} {user.name.last}
            </span>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Left Column: Profile + Total Balance */}
          <div className="flex flex-col justify-between gap-8 h-full">
            {/* Profile */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <img
                src={user.picture.large}
                alt="profile"
                className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              />
              <p className="text-gray-700 font-semibold text-lg">
                {user.name.first} {user.name.last}
              </p>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.phone}</p>
              <p className="text-gray-500 text-sm mt-1">
                {user.location.city}, {user.location.country}
              </p>
            </div>

            {/* Total Balance */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-500 font-medium">Total Balance</p>
              <p className="text-3xl font-bold text-pink-600">{formatCurrency(totalBalance)}</p>
            </div>
          </div>

          {/* Right Column: Accounts + Budget */}
          <div className="flex flex-col justify-between gap-6 h-full">
            {/* Accounts Overview */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Accounts</h3>
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div key={acc.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-700 font-medium">{acc.name}</span>
                    <span className="text-pink-600 font-semibold">{formatCurrency(acc.balance)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Summary</h3>
              <div className="space-y-3">
                {budget.map((b, i) => {
                  const percent = Math.min((b.spent / b.limit) * 100, 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-gray-700 mb-1">
                        <span>{b.category}</span>
                        <span>{formatCurrency(b.spent)} / {formatCurrency(b.limit)}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percent < 50
                              ? "bg-green-500"
                              : percent < 80
                              ? "bg-yellow-400"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
