import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Clock, Tag } from 'lucide-react';
import { couponApi } from '../services/api';

const CouponDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [coupon, setCoupon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const data = await couponApi.getCouponDetail(id!);
        setCoupon(data);
      } catch (err: any) {
        console.error('Failed to fetch coupon detail:', err);
        setError(err?.response?.data?.message || 'Failed to load coupon');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleCopy = () => {
    if (!coupon?.couponCode) return;
    navigator.clipboard.writeText(coupon.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDiscount = () => {
    if (!coupon?.coupon) return '';
    const c = coupon.coupon;
    if (c.type === 'FREE_ITEM') return 'FREE';
    if (c.type === 'BOGO') return 'B1G1';
    if (c.type === 'LOYALTY_REWARD') return '🎁';
    if (c.discountType === 'PERCENTAGE') return `${c.discountValue}% OFF`;
    if (c.discountType === 'FIXED_AMOUNT') return `฿${c.discountValue} OFF`;
    return '';
  };

  if (isLoading) {
    return (
      <div className="page" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="empty-state">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Clock size={36} style={{ opacity: 0.5 }} />
            </motion.div>
            <p style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>Loading coupon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="page" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '16px 0' }}>
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-icon">
              <ArrowLeft size={20} />
            </button>
          </motion.div>
          <div className="empty-state">
            <Tag size={48} style={{ opacity: 0.3 }} />
            <h3 style={{ color: 'var(--color-error)' }}>{error || 'Coupon not found'}</h3>
          </div>
        </div>
      </div>
    );
  }

  const daysLeft = Math.max(0, Math.ceil((new Date(coupon.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="page" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '16px 0' }}>
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-icon">
            <ArrowLeft size={20} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, marginBottom: 24, textAlign: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{coupon.coupon.title}</h3>
          <p className="text-muted text-sm" style={{ marginBottom: 20 }}>{coupon.coupon.description}</p>

          <div style={{
            fontSize: 28, fontWeight: 800, color: 'var(--color-primary)',
            marginBottom: 20, letterSpacing: 1
          }}>
            {formatDiscount()}
          </div>

          {/* Coupon Code Display */}
          <div style={{
            background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)',
            padding: '16px 20px', marginBottom: 16, border: '2px dashed var(--color-border)'
          }}>
            <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
              Your Coupon Code
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span style={{
                fontFamily: 'monospace', fontSize: 22, fontWeight: 700,
                letterSpacing: 3, color: 'var(--color-text)'
              }}>
                {coupon.couponCode}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? 'var(--color-success)' : 'var(--color-primary)',
                  border: 'none', borderRadius: 'var(--radius-sm)', padding: '8px 12px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                  color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-family)',
                  transition: 'background 0.2s ease'
                }}
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </div>

          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
            Show this code to the cashier to redeem
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Coupon Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Code</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{coupon.coupon.code}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Discount</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{formatDiscount()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Valid Until</span>
              <span style={{ fontWeight: 500, fontSize: 13 }}>{new Date(coupon.expiresAt).toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-muted text-sm">Status</span>
              <span style={{
                fontWeight: 600, fontSize: 12, padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                background: daysLeft <= 3 ? 'rgba(228,0,43,0.1)' : 'rgba(16,185,129,0.1)',
                color: daysLeft <= 3 ? 'var(--color-error)' : 'var(--color-success)'
              }}>
                {daysLeft === 0 ? 'Expires today!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
              </span>
            </div>
          </div>
        </motion.div>

        {coupon.coupon.termsConditions && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Terms & Conditions</h4>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{coupon.coupon.termsConditions}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CouponDetail;
