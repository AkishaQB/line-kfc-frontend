import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, X, Copy } from 'lucide-react';

const mockCoupons = [
  { id: '1', code: 'WELCOME20', title: 'Welcome 20% Off', type: 'PERCENTAGE', discountValue: 20, usageLimit: 1000, usedCount: 342, status: 'ACTIVE', expirationDate: '2026-07-20' },
  { id: '2', code: 'SAVE50', title: '฿50 Off Your Order', type: 'FIXED', discountValue: 50, usageLimit: 500, usedCount: 198, status: 'ACTIVE', expirationDate: '2026-06-20' },
  { id: '3', code: 'FREEDRINK', title: 'Free Pepsi', type: 'FREE_ITEM', discountValue: 0, usageLimit: 2000, usedCount: 876, status: 'ACTIVE', expirationDate: '2026-06-20' },
  { id: '4', code: 'BOGO-WINGS', title: 'Buy 1 Get 1 Hot Wings', type: 'BOGO', discountValue: 0, usageLimit: 300, usedCount: 145, status: 'ACTIVE', expirationDate: '2026-06-20' },
  { id: '5', code: 'LOYALTY-REWARD', title: 'Loyalty Reward: Free Zinger', type: 'LOYALTY_REWARD', discountValue: 0, usageLimit: null, usedCount: 56, status: 'ACTIVE', expirationDate: '2026-07-20' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'rgba(16,185,129,0.08)', text: '#10B981' },
  INACTIVE: { bg: 'rgba(107,114,128,0.08)', text: '#6B7280' },
  EXPIRED: { bg: 'rgba(239,68,68,0.08)', text: '#EF4444' },
};

const typeLabels: Record<string, string> = {
  PERCENTAGE: '% Off', FIXED: 'Fixed ฿', FREE_ITEM: 'Free Item', BOGO: 'BOGO', LOYALTY_REWARD: 'Loyalty',
};

const AdminCoupons = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockCoupons.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Coupons</h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>{mockCoupons.length} total coupons</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ gap: 6 }}>
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
        <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coupons..." style={{ paddingLeft: 40, background: 'white' }} />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #F1F5F9', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              {['Code', 'Title', 'Type', 'Usage', 'Status', 'Expires', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((coupon, i) => {
              const sc = statusColors[coupon.status] || statusColors.INACTIVE;
              const usagePct = coupon.usageLimit ? Math.round((coupon.usedCount / coupon.usageLimit) * 100) : null;
              return (
                <motion.tr key={coupon.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <code style={{ fontSize: 12, fontWeight: 600, background: '#F1F5F9', padding: '2px 8px', borderRadius: 6, color: '#334155' }}>{coupon.code}</code>
                      <button title="Copy" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CBD5E1', padding: 2 }}><Copy size={12} /></button>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{coupon.title}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, background: '#F1F5F9', padding: '3px 8px', borderRadius: 6, color: '#475569' }}>
                      {typeLabels[coupon.type]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, color: '#64748B' }}>
                      {coupon.usedCount}{coupon.usageLimit ? `/${coupon.usageLimit}` : ''}
                      {usagePct !== null && (
                        <div style={{ height: 4, width: 60, background: '#F1F5F9', borderRadius: 99, marginTop: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${usagePct}%`, background: usagePct > 80 ? '#EF4444' : '#10B981', borderRadius: 99 }} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.text }}>{coupon.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[{ icon: <Eye size={14} />, title: 'View' }, { icon: <Edit2 size={14} />, title: 'Edit' }, { icon: <Trash2 size={14} />, title: 'Delete' }].map((a, j) => (
                        <button key={j} title={a.title} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
                          {a.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'white', borderRadius: 18, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F1F5F9' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Create Coupon</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div><label className="input-label">Coupon Code</label><input className="input" placeholder="e.g. SUMMER25" /></div>
                <div><label className="input-label">Title</label><input className="input" placeholder="e.g. Summer 25% Off" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label className="input-label">Type</label>
                    <select className="input" style={{ cursor: 'pointer' }}>
                      <option>PERCENTAGE</option><option>FIXED</option><option>FREE_ITEM</option><option>BOGO</option>
                    </select>
                  </div>
                  <div><label className="input-label">Discount Value</label><input className="input" type="number" placeholder="25" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label className="input-label">Start Date</label><input className="input" type="date" /></div>
                  <div><label className="input-label">Expiry Date</label><input className="input" type="date" /></div>
                </div>
                <div><label className="input-label">Usage Limit</label><input className="input" type="number" placeholder="1000" /></div>
                <div><label className="input-label">Description</label><textarea className="input" rows={3} placeholder="Describe the coupon..." style={{ resize: 'vertical' }} /></div>
                <button className="btn btn-primary btn-lg btn-full">Create Coupon</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCoupons;
