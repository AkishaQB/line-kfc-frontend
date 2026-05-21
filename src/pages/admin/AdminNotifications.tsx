import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const AdminNotifications = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!title || !body) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setTitle('');
    setBody('');
  };

  const recentPushes = [
    { title: '🎉 Weekend Special!', body: 'Buy 1 Get 1 Hot Wings', sentAt: '2026-05-21T09:00:00Z', recipients: 12847 },
    { title: '⏰ Flash Sale!', body: '30% off all meals today only', sentAt: '2026-05-20T14:00:00Z', recipients: 12340 },
    { title: '🍗 New Menu Item', body: 'Try our new Spicy Zinger Max!', sentAt: '2026-05-18T10:00:00Z', recipients: 11890 },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Notifications</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Send LINE push notifications to customers</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Send Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #F1F5F9' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Send Push Notification</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><label className="input-label">Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. 🎉 Weekend Special!" /></div>
            <div><label className="input-label">Message Body</label><textarea className="input" rows={4} value={body} onChange={e => setBody(e.target.value)} placeholder="Enter notification message..." style={{ resize: 'vertical' }} /></div>
            <div><label className="input-label">Target Audience</label>
              <select className="input" style={{ cursor: 'pointer' }}>
                <option>All Customers</option><option>Bronze Tier</option><option>Silver Tier</option><option>Gold Tier</option><option>Platinum Tier</option>
              </select>
            </div>
            <button onClick={handleSend} className="btn btn-primary btn-lg btn-full" style={{ gap: 8 }}>
              <Send size={16} /> Send Notification
            </button>
            {sent && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ padding: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, color: '#10B981', fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
                ✅ Notification queued for delivery!
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Recent Pushes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: 'white', borderRadius: 14, border: '1px solid #F1F5F9' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Push Notifications</h3>
          </div>
          {recentPushes.map((n, i) => (
            <div key={i} style={{ padding: '16px 22px', borderBottom: i < recentPushes.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: 4 }}>{n.title}</h4>
              <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>{n.body}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#CBD5E1' }}>
                <span>Sent to {n.recipients.toLocaleString()} users</span>
                <span>{new Date(n.sentAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminNotifications;
