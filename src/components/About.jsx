"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function About() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => setUser(data.results[0]));
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 rounded-full blur-3xl opacity-20" />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`flex-1 transition-all duration-300 p-6 md:p-10 ${
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
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">About User</h1>
          <p className="text-gray-500">Here’s some information about you</p>
        </header>

        {/* User Card */}
        <section className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <img
              src={user.picture.large}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name.title} {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.phone}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="space-y-1">
                  <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                  <p><span className="font-semibold">Date Of Birth:</span> {new Date(user.dob.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Age:</span> {user.dob.age}</p>
                  <p><span className="font-semibold">Nationality:</span> {user.nat}</p>
                </div>
                <div className="space-y-1">
                  <p><span className="font-semibold">Address:</span> {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.country}</p>
                  <p><span className="font-semibold">Username:</span> {user.login.username}</p>
                  <p><span className="font-semibold">Registered:</span> {new Date(user.registered.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
