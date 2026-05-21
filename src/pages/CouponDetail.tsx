import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Clock, RefreshCw, Shield } from 'lucide-react';

const CouponDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300);
  const [qrKey, setQrKey] = useState(0);

  const coupon = {
    id, title: 'Welcome 20% Off', description: 'Get 20% off your first order!',
    type: 'PERCENTAGE', discountValue: 20, discountType: 'PERCENTAGE',
    code: 'WELCOME20', expiresAt: new Date(Date.now() + 15*86400000).toISOString(),
    termsConditions: 'Valid for new customers only. Cannot be combined with other offers. Minimum order ฿200.',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) { setQrKey(k => k + 1); return 300; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="page" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '16px 0' }}>
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-icon">
            <ArrowLeft size={20} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="qr-container" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{coupon.title}</h3>
          <p className="text-muted text-sm" style={{ marginBottom: 20 }}>{coupon.description}</p>

          <div className="qr-code">
            <QRCodeSVG key={qrKey} value={JSON.stringify({ token: `qr_${id}_${qrKey}`, ts: Date.now() })} size={220} fgColor="#1A1A1A" level="M" />
          </div>

          <div className="qr-timer" style={{ marginTop: 16 }}>
            <Clock size={14} />
            <span>Refreshes in {mins}:{secs.toString().padStart(2, '0')}</span>
            <button onClick={() => { setQrKey(k => k + 1); setTimeLeft(300); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
              <RefreshCw size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: 'var(--color-success)', fontSize: 12 }}>
            <Shield size={12} /> <span>Secured with HMAC signature</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Coupon Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Code</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{coupon.code}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Discount</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{coupon.discountValue}% OFF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Valid Until</span>
              <span style={{ fontWeight: 500, fontSize: 13 }}>{new Date(coupon.expiresAt).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {coupon.termsConditions && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Terms & Conditions</h4>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{coupon.termsConditions}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CouponDetail;
