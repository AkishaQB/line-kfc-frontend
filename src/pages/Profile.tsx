import { motion } from 'framer-motion';
import { useLiff } from '../contexts/LiffContext';
import TierBadge from '../components/TierBadge';
import { User, Star, Ticket, Clock, ChevronRight, LogOut, Settings, HelpCircle, FileText } from 'lucide-react';

const Profile = () => {
  const { profile, logout } = useLiff();

  const customer = { points: 1500, totalPoints: 3500, tier: 'SILVER', redemptions: 12, memberSince: '2024-06-15' };

  const stats = [
    { icon: <Star size={18} color="var(--color-accent)" />, label: 'Points', value: customer.points.toLocaleString() },
    { icon: <Ticket size={18} color="var(--color-primary)" />, label: 'Redeemed', value: customer.redemptions.toString() },
    { icon: <Clock size={18} color="var(--color-info)" />, label: 'Member Since', value: new Date(customer.memberSince).toLocaleDateString('en', { month: 'short', year: 'numeric' }) },
  ];

  const menuItems = [
    { icon: <Clock size={18} />, label: 'Points History', path: '#' },
    { icon: <Settings size={18} />, label: 'Settings', path: '#' },
    { icon: <HelpCircle size={18} />, label: 'Help & FAQ', path: '#' },
    { icon: <FileText size={18} />, label: 'Terms of Service', path: '#' },
  ];

  return (
    <div className="page">
      <div className="container">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '32px 0 24px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #B80023)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-primary)' }}>
            {profile?.pictureUrl ? (
              <img src={profile.pictureUrl} alt="Profile" style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <User size={36} color="white" />
            )}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{profile?.displayName || 'Guest'}</h2>
          <div style={{ marginTop: 8 }}><TierBadge tier={customer.tier} /></div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: 16, marginBottom: 24 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 0', borderRight: i < 2 ? '1px solid var(--color-border-light)' : 'none' }}>
              <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-text)' }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Menu */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="card" style={{ overflow: 'hidden', marginBottom: 24 }}>
          {menuItems.map((item, i) => (
            <a key={i} href={item.path}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', color: 'var(--color-text)', textDecoration: 'none', borderBottom: i < menuItems.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-secondary)' }}>
                {item.icon}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{item.label}</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-muted)" />
            </a>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          onClick={logout} className="btn btn-outline btn-full"
          style={{ gap: 8, color: 'var(--color-error)', borderColor: 'rgba(239,68,68,0.3)' }}>
          <LogOut size={16} /> Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
