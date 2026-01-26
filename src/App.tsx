import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DashboardPage from "./pages/dashboard";
import ExpensesPage from "./pages/expenses";
import Footer from "./components/common/footer";
import GroupPage from "./pages/group-page";
import Groups from "./pages/groups";
import Home from "./pages/home";
import Nav from "./components/common/nav";
import React from "react";
import SettlementPage from "./pages/settlements";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/settlements" element={<SettlementPage />} />
        {/* Dynamic routes */}
        <Route path="/groups/:groupId" element={<GroupPage />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
