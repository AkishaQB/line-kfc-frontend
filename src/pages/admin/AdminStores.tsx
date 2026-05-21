import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

const mockStores = [
  { id: '1', name: 'KFC Central Plaza', code: 'KFC-001', city: 'Bangkok', address: '999 Central Plaza, Floor 3', phone: '02-123-4567', redemptions: 234, isActive: true },
  { id: '2', name: 'KFC Siam Paragon', code: 'KFC-002', city: 'Bangkok', address: '991 Siam Paragon, Floor G', phone: '02-234-5678', redemptions: 189, isActive: true },
  { id: '3', name: 'KFC MBK Center', code: 'KFC-003', city: 'Bangkok', address: '444 MBK Center, Floor 5', phone: '02-345-6789', redemptions: 156, isActive: true },
  { id: '4', name: 'KFC Terminal 21', code: 'KFC-004', city: 'Bangkok', address: '2 Sukhumvit Soi 19', phone: '02-456-7890', redemptions: 128, isActive: true },
  { id: '5', name: 'KFC EmQuartier', code: 'KFC-005', city: 'Bangkok', address: '693 Sukhumvit Road', phone: '02-567-8901', redemptions: 98, isActive: false },
];

const AdminStores = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Stores</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>{mockStores.length} registered locations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {mockStores.map((store, i) => (
          <motion.div key={store.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #F1F5F9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative' }}>
            {!store.isActive && (
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.08)', color: '#EF4444' }}>INACTIVE</span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <code style={{ fontSize: 11, fontWeight: 600, background: '#F1F5F9', padding: '2px 6px', borderRadius: 4, color: '#475569' }}>{store.code}</code>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>{store.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#94A3B8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} /> {store.address}, {store.city}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} /> {store.phone}</span>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#64748B' }}>Total Redemptions</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>{store.redemptions}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminStores;
