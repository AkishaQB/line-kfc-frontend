import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CouponCard from '../components/CouponCard';
import { Ticket } from 'lucide-react';

const tabs = ['Active', 'Used', 'Expired'];

const mockActive = [
  { id: '1', title: 'Welcome 20% Off', description: 'Get 20% off!', type: 'PERCENTAGE', discountType: 'PERCENTAGE', discountValue: 20, expiresAt: new Date(Date.now() + 15*86400000).toISOString(), code: 'WELCOME20' },
  { id: '2', title: '฿50 Off', description: 'Min ฿300', type: 'FIXED', discountType: 'FIXED_AMOUNT', discountValue: 50, expiresAt: new Date(Date.now() + 7*86400000).toISOString(), code: 'SAVE50' },
  { id: '3', title: 'Free Pepsi', description: 'With bucket meal', type: 'FREE_ITEM', expiresAt: new Date(Date.now() + 2*86400000).toISOString(), code: 'FREEDRINK' },
];

const MyCoupons = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const coupons = activeTab === 'Active' ? mockActive : [];

  return (
    <div className="page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>My Coupons</h1>
        </motion.div>

        <div style={{ display: 'flex', gap: 4, background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 20 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: 10, border: 'none', borderRadius: 'var(--radius-sm)', background: activeTab === tab ? 'var(--color-surface)' : 'transparent', color: activeTab === tab ? 'var(--color-text)' : 'var(--color-text-muted)', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: activeTab === tab ? 700 : 500, cursor: 'pointer', boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none' }}>
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {coupons.length > 0 ? coupons.map((c, i) => <CouponCard key={c.id} {...c} index={i} />) : (
              <div className="empty-state">
                <Ticket size={48} style={{ opacity: 0.3 }} />
                <h3>No {activeTab.toLowerCase()} coupons</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyCoupons;
