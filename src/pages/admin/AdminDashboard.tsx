import { motion } from 'framer-motion';
import { Users, Ticket, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  { label: 'Total Customers', value: '12,847', change: '+8.2%', up: true, icon: <Users size={20} />, color: '#3B82F6' },
  { label: 'Active Coupons', value: '24', change: '+3', up: true, icon: <Ticket size={20} />, color: '#E4002B' },
  { label: 'Redemptions Today', value: '342', change: '+12.5%', up: true, icon: <ShoppingBag size={20} />, color: '#10B981' },
  { label: 'Points Issued', value: '1.2M', change: '-2.1%', up: false, icon: <TrendingUp size={20} />, color: '#F59E0B' },
];

const recentRedemptions = [
  { customer: 'Somchai D.', coupon: 'Welcome 20% Off', store: 'KFC Central Plaza', time: '5 min ago', points: 10 },
  { customer: 'Suda K.', coupon: 'Free Pepsi', store: 'KFC Siam Paragon', time: '12 min ago', points: 5 },
  { customer: 'Chai P.', coupon: '฿50 Off', store: 'KFC MBK Center', time: '25 min ago', points: 15 },
  { customer: 'Nong W.', coupon: 'BOGO Hot Wings', store: 'KFC Terminal 21', time: '1 hr ago', points: 10 },
  { customer: 'Pim S.', coupon: 'Welcome 20% Off', store: 'KFC EmQuartier', time: '2 hrs ago', points: 10 },
];

const tierData = [
  { tier: 'Bronze', count: 8421, pct: 65.5, color: '#CD7F32' },
  { tier: 'Silver', count: 2856, pct: 22.2, color: '#C0C0C0' },
  { tier: 'Gold', count: 1203, pct: 9.4, color: '#FFD700' },
  { tier: 'Platinum', count: 367, pct: 2.9, color: '#E5E4E2' },
];

const AdminDashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Dashboard</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Overview of your coupon & loyalty platform</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{ background: 'white', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                {stat.icon}
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: stat.up ? '#10B981' : '#EF4444', background: stat.up ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', padding: '3px 8px', borderRadius: 6 }}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>{stat.value}</p>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Redemptions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9', gridColumn: 'span 1' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Recent Redemptions</h3>
            <a href="/admin/redemptions" style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary)' }}>View All</a>
          </div>
          <div>
            {recentRedemptions.map((r, i) => (
              <div key={i} style={{ padding: '12px 22px', borderBottom: i < recentRedemptions.length - 1 ? '1px solid #F8FAFC' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{r.customer}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8' }}>{r.coupon} • {r.store}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#10B981' }}>+{r.points} pts</p>
                  <p style={{ fontSize: 11, color: '#CBD5E1' }}>{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Tier Distribution</h3>
          </div>
          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tierData.map((t, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, boxShadow: `0 0 6px ${t.color}40` }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{t.tier}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{t.count.toLocaleString()} ({t.pct}%)</span>
                </div>
                <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${t.pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    style={{ height: '100%', background: t.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
