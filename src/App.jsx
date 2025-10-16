import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Accounts from "./components/Accounts";
import Budgets from "./components/Budgets";
import Reports from "./components/Reports";
import Help from "./components/Help";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
}
