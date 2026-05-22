import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Search, Tag, ArrowRight, X, Gift, User, Ticket, Loader2 } from 'lucide-react';
import { redemptionApi } from '../../services/api';

// ─── Types ───────────────────────────────────────────────────────

interface ValidatedCoupon {
  redemptionId: string;
  transactionRef: string;
  coupon: {
    title: string;
    type: string;
    discountType: string | null;
    discountValue: number | null;
  };
  customer: {
    displayName: string;
    tier: string;
  };
}

interface Redemption {
  id: string;
  status: string;
  pointsEarned: number;
  redeemedAt: string | null;
  createdAt: string;
  assignment: {
    couponCode: string;
    coupon: { title: string; code: string; type: string };
  };
  customer: { displayName: string; tier: string };
  store?: { name: string } | null;
}

// ─── Status badge config ─────────────────────────────────────────

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  COMPLETED: { icon: <CheckCircle size={14} />, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  PENDING:   { icon: <Clock size={14} />,       color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  FAILED:    { icon: <XCircle size={14} />,      color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  CANCELLED: { icon: <XCircle size={14} />,      color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
};

const tierColors: Record<string, string> = {
  BRONZE: '#CD7F32', SILVER: '#94A3B8', GOLD: '#F59E0B', PLATINUM: '#8B5CF6',
};

// ─── Component ───────────────────────────────────────────────────

const AdminRedemptions = () => {
  // Redeem flow state
  const [couponCode, setCouponCode] = useState('');
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState<ValidatedCoupon | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [pointsToAward, setPointsToAward] = useState(10);
  const [error, setError] = useState('');

  // Redemption log state
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [logLoading, setLogLoading] = useState(true);

  // ─── Fetch redemption log ───────────────────────────────────

  const fetchRedemptions = useCallback(async () => {
    setLogLoading(true);
    try {
      const data: any = await redemptionApi.getAll(1, 50);
      const list = Array.isArray(data) ? data : (data?.items || data?.data || []);
      setRedemptions(list);
    } catch {
      // silently fail — the log is secondary
    } finally {
      setLogLoading(false);
    }
  }, []);

  useEffect(() => { fetchRedemptions(); }, [fetchRedemptions]);

  // ─── Step 1: Validate coupon code ───────────────────────────

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setError('');
    setValidated(null);
    setRedeemSuccess(false);
    setValidating(true);

    try {
      const result = await redemptionApi.validate(couponCode.trim()) as any;
      setValidated(result);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Invalid coupon code';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setValidating(false);
    }
  };

  // ─── Step 2: Complete redemption ────────────────────────────

  const handleRedeem = async () => {
    if (!validated) return;

    setRedeeming(true);
    setError('');

    try {
      await redemptionApi.redeem(validated.redemptionId, pointsToAward);
      setRedeemSuccess(true);
      setValidated(null);
      setCouponCode('');
      fetchRedemptions(); // refresh log
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Redemption failed';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setRedeeming(false);
    }
  };

  // ─── Reset ──────────────────────────────────────────────────

  const handleReset = () => {
    setCouponCode('');
    setValidated(null);
    setRedeemSuccess(false);
    setError('');
    setPointsToAward(10);
  };

  // ─── Format discount ───────────────────────────────────────

  const formatDiscount = (c: ValidatedCoupon['coupon']) => {
    if (c.type === 'FREE_ITEM') return 'FREE ITEM';
    if (c.type === 'BOGO') return 'BUY 1 GET 1';
    if (c.type === 'LOYALTY_REWARD') return '🎁 REWARD';
    if (c.discountType === 'PERCENTAGE') return `${c.discountValue}% OFF`;
    if (c.discountType === 'FIXED_AMOUNT') return `฿${c.discountValue} OFF`;
    return c.type;
  };

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B' }}>Redemptions</h1>
        <p style={{ color: '#64748B', fontSize: 14 }}>Validate and redeem customer coupon codes</p>
      </div>

      {/* ─── Redeem Card ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          borderRadius: 16, padding: 28, marginBottom: 28,
          color: 'white', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: -40, top: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(228,0,43,0.15)',
        }} />

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, position: 'relative' }}>
          <Tag size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Redeem Coupon
        </h2>
        <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 20, position: 'relative' }}>
          Enter a customer's coupon code to validate and process redemption
        </p>

        {/* Step 1: Input coupon code */}
        <AnimatePresence mode="wait">
          {!validated && !redeemSuccess && (
            <motion.form
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleValidate}
              style={{ display: 'flex', gap: 10, position: 'relative' }}
            >
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setError(''); }}
                  placeholder="Enter coupon code (e.g. CPN-XXXXXX)"
                  style={{
                    width: '100%', padding: '14px 14px 14px 42px', borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                    color: 'white', fontSize: 15, fontFamily: 'monospace', fontWeight: 600,
                    letterSpacing: 1, outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={validating || !couponCode.trim()}
                style={{
                  padding: '14px 24px', borderRadius: 12, border: 'none',
                  background: '#E4002B', color: 'white', fontSize: 14, fontWeight: 700,
                  cursor: validating || !couponCode.trim() ? 'not-allowed' : 'pointer',
                  opacity: validating || !couponCode.trim() ? 0.5 : 1,
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'opacity 0.2s',
                }}
              >
                {validating ? <Loader2 size={16} className="spin" /> : <ArrowRight size={16} />}
                {validating ? 'Validating...' : 'Validate'}
              </button>
            </motion.form>
          )}

          {/* Step 2: Confirm redemption */}
          {validated && !redeemSuccess && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 20,
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Coupon Verified ✓</p>
                    <h3 style={{ fontSize: 20, fontWeight: 700 }}>{validated.coupon.title}</h3>
                  </div>
                  <button onClick={handleReset} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}>
                    <X size={18} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <Ticket size={14} style={{ opacity: 0.6 }} />
                      <span style={{ fontSize: 11, opacity: 0.5 }}>Discount</span>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#F87171' }}>
                      {formatDiscount(validated.coupon)}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <User size={14} style={{ opacity: 0.6 }} />
                      <span style={{ fontSize: 11, opacity: 0.5 }}>Customer</span>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{validated.customer.displayName}</span>
                    <span style={{
                      display: 'inline-block', marginLeft: 8, fontSize: 10, fontWeight: 700,
                      padding: '2px 8px', borderRadius: 99,
                      background: `${tierColors[validated.customer.tier] || '#94A3B8'}22`,
                      color: tierColors[validated.customer.tier] || '#94A3B8',
                    }}>
                      {validated.customer.tier}
                    </span>
                  </div>
                </div>

                {/* Points to award */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, opacity: 0.6, display: 'block', marginBottom: 6 }}>
                    <Gift size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    Points to award
                  </label>
                  <input
                    type="number"
                    value={pointsToAward}
                    onChange={(e) => setPointsToAward(Math.max(0, parseInt(e.target.value) || 0))}
                    min={0}
                    style={{
                      width: 100, padding: '8px 12px', borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                      color: 'white', fontSize: 16, fontWeight: 700, textAlign: 'center',
                    }}
                  />
                </div>

                {/* Confirm / Cancel buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={handleRedeem}
                    disabled={redeeming}
                    style={{
                      flex: 1, padding: 14, borderRadius: 12, border: 'none',
                      background: '#10B981', color: 'white', fontSize: 15, fontWeight: 700,
                      cursor: redeeming ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {redeeming ? <Loader2 size={16} className="spin" /> : <CheckCircle size={16} />}
                    {redeeming ? 'Processing...' : 'Confirm Redemption'}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={redeeming}
                    style={{
                      padding: '14px 20px', borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
                      color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {redeemSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '24px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <CheckCircle size={56} color="#10B981" />
              </motion.div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>Redemption Complete!</h3>
              <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>
                {pointsToAward > 0 ? `+${pointsToAward} points awarded to the customer` : 'Coupon has been redeemed'}
              </p>
              <button
                onClick={handleReset}
                style={{
                  marginTop: 16, padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 14,
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Redeem Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 12, padding: '10px 14px', borderRadius: 10,
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#FCA5A5', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <XCircle size={14} /> {error}
          </motion.div>
        )}
      </motion.div>

      {/* ─── Redemption Log ────────────────────────────────────── */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B' }}>Recent Redemptions</h2>
        <button
          onClick={fetchRedemptions}
          style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#64748B', cursor: 'pointer', fontWeight: 500 }}
        >
          Refresh
        </button>
      </div>

      <div style={{
        background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        border: '1px solid #F1F5F9', overflow: 'hidden',
      }}>
        {logLoading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
            <Loader2 size={24} className="spin" style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: 13 }}>Loading redemptions...</p>
          </div>
        ) : redemptions.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
            <Ticket size={32} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
            <p style={{ fontSize: 13 }}>No redemptions yet</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                {['Customer', 'Coupon', 'Code', 'Store', 'Status', 'Points', 'Time'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {redemptions.map((r, i) => {
                const sc = statusConfig[r.status] || statusConfig.PENDING;
                return (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{r.customer?.displayName || '—'}</span>
                      {r.customer?.tier && (
                        <span style={{
                          display: 'inline-block', marginLeft: 6, fontSize: 9, fontWeight: 700,
                          padding: '1px 6px', borderRadius: 99,
                          background: `${tierColors[r.customer.tier] || '#94A3B8'}15`,
                          color: tierColors[r.customer.tier] || '#94A3B8',
                        }}>
                          {r.customer.tier}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{r.assignment?.coupon?.title || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 11, fontFamily: 'monospace', color: '#64748B' }}>{r.assignment?.couponCode || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>{r.store?.name || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11,
                        fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color,
                      }}>
                        {sc.icon} {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: r.pointsEarned > 0 ? '#10B981' : '#CBD5E1' }}>
                      {r.pointsEarned > 0 ? `+${r.pointsEarned}` : '—'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#94A3B8' }}>
                      {r.redeemedAt ? new Date(r.redeemedAt).toLocaleString() : r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Spin animation for Loader2 */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminRedemptions;
