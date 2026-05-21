import { motion } from 'framer-motion';
import { useLiff } from '../contexts/LiffContext';
import { Ticket, Star, TrendingUp, Bell } from 'lucide-react';
import TierBadge from '../components/TierBadge';
import CouponCard from '../components/CouponCard';

// Mock data for demonstration
const mockCoupons = [
  {
    id: '1',
    title: 'Welcome 20% Off',
    description: 'Get 20% off your first order!',
    type: 'PERCENTAGE',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    code: 'WELCOME20',
  },
  {
    id: '2',
    title: '฿50 Off Your Order',
    description: 'Save ฿50 on orders above ฿300',
    type: 'FIXED',
    discountType: 'FIXED_AMOUNT',
    discountValue: 50,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    code: 'SAVE50',
  },
  {
    id: '3',
    title: 'Free Pepsi',
    description: 'With any bucket meal!',
    type: 'FREE_ITEM',
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    code: 'FREEDRINK',
  },
];

const Home = () => {
  const { profile } = useLiff();

  const customer = {
    points: 1500,
    tier: 'SILVER',
    totalPoints: 3500,
    unreadNotifications: 3,
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero-gradient" style={{ paddingBottom: '48px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 24,
            }}
          >
            <div>
              <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: 4 }}>Good afternoon,</p>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: 8 }}>
                {profile?.displayName || 'Guest'} 👋
              </h2>
              <TierBadge tier={customer.tier} size="sm" />
            </div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'relative',
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Bell size={20} color="white" />
              {customer.unreadNotifications > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 18,
                    height: 18,
                    background: '#FFD700',
                    color: '#1A1A1A',
                    borderRadius: '50%',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {customer.unreadNotifications}
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-glass"
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', opacity: 0.75, marginBottom: 4 }}>Available Points</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <motion.span
                    style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.03em' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                  >
                    {customer.points.toLocaleString()}
                  </motion.span>
                  <span style={{ fontSize: '14px', opacity: 0.7 }}>pts</span>
                </div>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'rgba(255,215,0,0.2)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={28} color="#FFD700" fill="#FFD700" />
              </div>
            </div>

            {/* Tier Progress */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.7, marginBottom: 6 }}>
                <span>Silver</span>
                <span>Gold (5,000 pts)</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                    borderRadius: '99px',
                  }}
                />
              </div>
              <p style={{ fontSize: '11px', opacity: 0.6, marginTop: 4 }}>1,500 pts to Gold tier</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container" style={{ marginTop: '-24px', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card card-elevated"
          style={{ padding: '16px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              { icon: <Ticket size={22} />, label: 'My Coupons', color: '#E4002B', path: '/coupons' },
              { icon: <Star size={22} />, label: 'Earn Points', color: '#FFD700', path: '/rewards' },
              { icon: <TrendingUp size={22} />, label: 'Tier Benefits', color: '#10B981', path: '/rewards' },
            ].map((action, i) => (
              <motion.a
                key={i}
                href={action.path}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--color-surface-hover)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.color,
                  }}
                >
                  {action.icon}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>{action.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Coupons */}
      <div className="container" style={{ marginTop: '24px' }}>
        <div className="section">
          <div className="section-title">
            <span>Active Coupons</span>
            <a href="/coupons" style={{ fontSize: '13px', fontWeight: 600 }}>
              See All →
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockCoupons.map((coupon, i) => (
              <CouponCard key={coupon.id} {...coupon} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Highlights */}
      <div className="container">
        <div className="section">
          <div className="section-title">
            <span>🔥 Hot Deals</span>
          </div>

          <motion.div
            className="card card-elevated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
              color: 'white',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                fontSize: '80px',
                opacity: 0.1,
              }}
            >
              🍗
            </div>
            <span
              style={{
                display: 'inline-block',
                background: '#E4002B',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              LIMITED TIME
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: 8 }}>
              Buy 1 Get 1 Hot Wings
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: 16 }}>
              This weekend only! Get double the wings, double the fun.
            </p>
            <button
              className="btn"
              style={{
                background: '#E4002B',
                color: 'white',
                padding: '10px 20px',
                fontSize: '13px',
              }}
            >
              Claim Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
