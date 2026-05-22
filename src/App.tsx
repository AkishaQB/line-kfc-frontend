import { Routes, Route, Navigate } from "react-router-dom";
import { useLiff } from "./contexts/LiffContext";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import MyCoupons from "./pages/MyCoupons";
import CouponDetail from "./pages/CouponDetail";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminRedemptions from "./pages/admin/AdminRedemptions";
import AdminStores from "./pages/admin/AdminStores";
import AdminNotifications from "./pages/admin/AdminNotifications";

function App() {
  const { isLoggedIn, isLoading } = useLiff();

  return (
    <Routes>
      {/* Admin routes (independent of LIFF) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          localStorage.getItem("admin_token") ? (
            <AdminLayout />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="redemptions" element={<AdminRedemptions />} />
        <Route path="stores" element={<AdminStores />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      {/* LIFF customer routes */}
      <Route
        path="/*"
        element={
          isLoading ? (
            <LoadingSpinner fullPage message="Initializing..." />
          ) : !isLoggedIn ? (
            <Login />
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coupons" element={<MyCoupons />} />
                <Route path="/coupons/:id" element={<CouponDetail />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <BottomNav />
            </>
          )
        }
      />
    </Routes>
  );
}

export default App;
