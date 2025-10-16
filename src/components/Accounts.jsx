"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Accounts() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [modal, setModal] = useState({ open: false, accountId: null, type: "deposit", amount: "" });

  useEffect(() => {
    // Contoh data akun
    setAccounts([
      { id: 1, name: "Main Account", balance: 2400.5 },
      { id: 2, name: "Savings Account", balance: 10300.75 },
      { id: 3, name: "Business Account", balance: 45200.0 },
    ]);
  }, []);

  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);

  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Open modal
  const openModal = (accountId, type) => setModal({ open: true, accountId, type, amount: "" });

  // Close modal
  const closeModal = () => setModal({ open: false, accountId: null, type: "deposit", amount: "" });

  // Handle input
  const handleAmountChange = (e) => setModal({ ...modal, amount: e.target.value });

  // Submit Deposit/Withdraw
  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(modal.amount);
    if (isNaN(amt)) return;

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === modal.accountId
          ? { ...acc, balance: modal.type === "deposit" ? acc.balance + amt : acc.balance - amt }
          : acc
      )
    );
    closeModal();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
      {/* Background gradient blur */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 rounded-full blur-3xl opacity-20" />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className={`flex-1 transition-all duration-300 p-10 ${sidebarOpen ? "pl-72" : "pl-28"}`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Accounts Dashboard</h2>

        {/* Total Balance */}
        <div className="mb-6 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 text-center">
          <p className="text-gray-500 font-medium">Total Balance Across Accounts</p>
          <p className="text-3xl font-bold text-pink-600">{formatCurrency(totalBalance)}</p>
        </div>

        {/* Account Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{acc.name}</h3>
              <p className="text-gray-600">Balance:</p>
              <p className={`text-2xl font-bold ${acc.balance < 1000 ? "text-red-600" : "text-pink-600"}`}>
                {formatCurrency(acc.balance)}
              </p>

              {/* Deposit / Withdraw Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openModal(acc.id, "deposit")}
                  className="flex-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                >
                  Deposit
                </button>
                <button
                  onClick={() => openModal(acc.id, "withdraw")}
                  className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-xl p-6 w-80">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                {modal.type} funds
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={modal.amount}
                  onChange={handleAmountChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  required
                  min="0"
                  step="0.01"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-white ${
                      modal.type === "deposit" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    } transition`}
                  >
                    {modal.type === "deposit" ? "Deposit" : "Withdraw"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
