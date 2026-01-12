import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/common/nav";
import Home from "./pages/home";
import Footer from "./components/common/footer";
import Dashboard from "./pages/dashboards";
import Groups from "./pages/groups";
import ExpensesPage from "./pages/expenses";
import ActivityPage from "./pages/activity";
import { Toaster } from "react-hot-toast";
import GroupPage from "./pages/group-page";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        {/* Dynamic routes */}
        <Route path="/groups/:groupId" element={<GroupPage />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
