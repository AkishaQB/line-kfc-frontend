import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const mockRedemptions = [
  { id: '1', customer: 'Somchai Demo', coupon: 'Welcome 20% Off', store: 'KFC Central Plaza', status: 'COMPLETED', pointsEarned: 10, redeemedAt: '2026-05-21T10:30:00Z' },
  { id: '2', customer: 'Suda Demo', coupon: 'Free Pepsi', store: 'KFC Siam Paragon', status: 'COMPLETED', pointsEarned: 5, redeemedAt: '2026-05-21T10:15:00Z' },
  { id: '3', customer: 'Chai Premium', coupon: '฿50 Off', store: 'KFC MBK Center', status: 'COMPLETED', pointsEarned: 15, redeemedAt: '2026-05-21T09:45:00Z' },
  { id: '4', customer: 'Nong Star', coupon: 'BOGO Wings', store: 'KFC Terminal 21', status: 'PENDING', pointsEarned: 0, redeemedAt: null },
  { id: '5', customer: 'Pim Lucky', coupon: 'Welcome 20% Off', store: 'KFC EmQuartier', status: 'CANCELLED', pointsEarned: 0, redeemedAt: null },
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  COMPLETED: { icon: <CheckCircle size={14} />, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  PENDING: { icon: <Clock size={14} />, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  CANCELLED: { icon: <XCircle size={14} />, color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
};

const AdminRedemptions = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Redemptions</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Transaction log of all coupon redemptions</p>
      </div>

      <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['Customer', 'Coupon', 'Store', 'Status', 'Points', 'Time'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockRedemptions.map((r, i) => {
              const sc = statusConfig[r.status] || statusConfig.PENDING;
              return (
                <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{r.customer}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{r.coupon}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>{r.store}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color }}>
                      {sc.icon} {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: r.pointsEarned > 0 ? '#10B981' : '#CBD5E1' }}>
                    {r.pointsEarned > 0 ? `+${r.pointsEarned}` : '—'}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>
                    {r.redeemedAt ? new Date(r.redeemedAt).toLocaleString() : '—'}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRedemptions;
