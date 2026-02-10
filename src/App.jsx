import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Vote from './pages/Vote/index';
import CategoryVote from './pages/Vote/CategoryVote';
import Nominate from './pages/Nominate/index';
import CategoryNominate from './pages/Nominate/CategoryNominate';
import BuyTicket from './pages/BuyTicket';
import WaitingList from './pages/WaitingList'; // Added
import ScrollToTop from './components/ScrollToTop';
import BottomNav from './components/BottomNav';
import { useMobileFeatures } from './hooks/useMobileFeatures';

// Admin
import Login from './pages/Admin/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Nominees from './pages/Admin/Nominees';
import Categories from './pages/Admin/Categories';
import Tickets from './pages/Admin/Tickets';
import WaitingListAdmin from './pages/Admin/WaitingListAdmin';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  useMobileFeatures();

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/vote/:slug" element={<CategoryVote />} />
        <Route path="/nominate" element={<Nominate />} />
        <Route path="/nominate/:slug" element={<CategoryNominate />} />
        <Route path="/buy-ticket" element={<BuyTicket />} />
        <Route path="/waiting-list" element={<WaitingList />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="nominees" element={<Nominees />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="waiting-list" element={<WaitingListAdmin />} />
        </Route>
      </Routes>
      {!isAdminRoute && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
