import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye } from 'lucide-react';

const mockCustomers = [
  { id: '1', displayName: 'Somchai Demo', lineUserId: 'U_demo_001', tier: 'SILVER', points: 1500, totalPoints: 3500, redemptions: 8, lastActive: '2026-05-21' },
  { id: '2', displayName: 'Suda Demo', lineUserId: 'U_demo_002', tier: 'BRONZE', points: 500, totalPoints: 800, redemptions: 3, lastActive: '2026-05-20' },
  { id: '3', displayName: 'Chai Premium', lineUserId: 'U_demo_003', tier: 'PLATINUM', points: 8500, totalPoints: 12000, redemptions: 42, lastActive: '2026-05-21' },
  { id: '4', displayName: 'Nong Star', lineUserId: 'U_demo_004', tier: 'GOLD', points: 4200, totalPoints: 6800, redemptions: 18, lastActive: '2026-05-19' },
  { id: '5', displayName: 'Pim Lucky', lineUserId: 'U_demo_005', tier: 'BRONZE', points: 200, totalPoints: 200, redemptions: 1, lastActive: '2026-05-18' },
];

const tierColors: Record<string, string> = {
  BRONZE: '#CD7F32', SILVER: '#C0C0C0', GOLD: '#FFD700', PLATINUM: '#A8A8A8',
};

const AdminCustomers = () => {
  const [search, setSearch] = useState('');
  const filtered = mockCustomers.filter(c => c.displayName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Customers</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>{mockCustomers.length} registered customers</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." style={{ paddingLeft: 40, background: 'white' }} />
      </div>

      <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['Customer', 'Tier', 'Points', 'Lifetime', 'Redemptions', 'Last Active', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                style={{ borderBottom: '1px solid #F8FAFC' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${tierColors[c.tier]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: tierColors[c.tier] }}>
                      {c.displayName.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{c.displayName}</p>
                      <p style={{ fontSize: 11, color: '#CBD5E1', fontFamily: 'monospace' }}>{c.lineUserId}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: `${tierColors[c.tier]}18`, color: tierColors[c.tier] === '#C0C0C0' || tierColors[c.tier] === '#FFD700' ? '#78716C' : tierColors[c.tier] }}>
                    {c.tier}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{c.points.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>{c.totalPoints.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>{c.redemptions}</td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>{new Date(c.lastActive).toLocaleDateString()}</td>
                <td style={{ padding: '14px 16px' }}>
                  <button title="View" style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
                    <Eye size={14} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
