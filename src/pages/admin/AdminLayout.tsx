import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Ticket, Megaphone, Users, BarChart3,
  Store, Bell, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const sidebarItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin' },
  { icon: <Ticket size={18} />, label: 'Coupons', path: '/admin/coupons' },
  { icon: <Megaphone size={18} />, label: 'Campaigns', path: '/admin/campaigns' },
  { icon: <Users size={18} />, label: 'Customers', path: '/admin/customers' },
  { icon: <BarChart3 size={18} />, label: 'Redemptions', path: '/admin/redemptions' },
  { icon: <Store size={18} />, label: 'Stores', path: '/admin/stores' },
  { icon: <Bell size={18} />, label: 'Notifications', path: '/admin/notifications' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const adminName = localStorage.getItem('admin_name') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_role');
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: 'linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : -260,
          bottom: 0,
          zIndex: 50,
          transition: 'left 0.3s ease',
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🍗</span>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>CouponAdmin</h3>
              <p style={{ fontSize: 11, opacity: 0.5 }}>Management Console</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 10,
                color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(228, 0, 43, 0.9)' : 'transparent',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s',
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{adminName}</span>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ height: 56, background: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, position: 'sticky', top: 0, zIndex: 30 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 4 }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#94A3B8' }}>
            <span>Admin</span>
            <ChevronRight size={14} />
            <span style={{ color: '#1E293B', fontWeight: 500 }}>Dashboard</span>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Desktop sidebar override */}
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar { left: 0 !important; }
          .admin-sidebar ~ div { margin-left: 260px; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
