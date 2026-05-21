import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Pause, Eye } from 'lucide-react';

const mockCampaigns = [
  { id: '1', name: 'Welcome Campaign', trigger: 'NEW_USER', coupon: 'Welcome 20% Off', status: 'ACTIVE', issuedCount: 342, startDate: '2026-05-01', endDate: '2026-07-20' },
  { id: '2', name: 'Birthday Special', trigger: 'BIRTHDAY', coupon: 'Free Pepsi', status: 'ACTIVE', issuedCount: 56, startDate: '2026-05-01', endDate: '2026-07-20' },
  { id: '3', name: 'Win-back Inactive', trigger: 'INACTIVITY', coupon: '฿50 Off Your Order', status: 'PAUSED', issuedCount: 120, startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: '4', name: 'Loyalty Milestone', trigger: 'PURCHASE_MILESTONE', coupon: 'BOGO Hot Wings', status: 'DRAFT', issuedCount: 0, startDate: '2026-06-01', endDate: '2026-08-31' },
];

const triggerColors: Record<string, string> = {
  NEW_USER: '#3B82F6', BIRTHDAY: '#EC4899', INACTIVITY: '#F59E0B', PURCHASE_MILESTONE: '#10B981', MANUAL: '#6B7280',
};

const statusBadge = (status: string) => {
  const map: Record<string, { bg: string; text: string }> = {
    ACTIVE: { bg: 'rgba(16,185,129,0.08)', text: '#10B981' },
    PAUSED: { bg: 'rgba(245,158,11,0.08)', text: '#F59E0B' },
    DRAFT: { bg: 'rgba(107,114,128,0.08)', text: '#6B7280' },
    COMPLETED: { bg: 'rgba(99,102,241,0.08)', text: '#6366F1' },
  };
  const s = map[status] || map.DRAFT;
  return <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: s.bg, color: s.text }}>{status}</span>;
};

const AdminCampaigns = () => {
  const [search, setSearch] = useState('');
  const filtered = mockCampaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Campaigns</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Manage automated coupon distribution campaigns</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..." style={{ paddingLeft: 40, background: 'white' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ background: 'white', borderRadius: 14, padding: '20px 24px', border: '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>{c.name}</h3>
                {statusBadge(c.status)}
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: triggerColors[c.trigger] || '#ccc' }} />
                  {c.trigger.replace('_', ' ')}
                </span>
                <span>Coupon: {c.coupon}</span>
                <span>Issued: {c.issuedCount}</span>
                <span>{new Date(c.startDate).toLocaleDateString()} - {new Date(c.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {c.status === 'ACTIVE' && (
                <button title="Pause" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#F59E0B' }}>
                  <Pause size={14} />
                </button>
              )}
              {(c.status === 'DRAFT' || c.status === 'PAUSED') && (
                <button title="Activate" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#10B981' }}>
                  <Play size={14} />
                </button>
              )}
              <button title="View" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
                <Eye size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCampaigns;
