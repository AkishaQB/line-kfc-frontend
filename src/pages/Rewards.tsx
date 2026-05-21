import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import TierBadge from '../components/TierBadge';
import StampCard from '../components/StampCard';

const Rewards = () => {
  const customer = { points: 1500, totalPoints: 3500, tier: 'SILVER' };

  const tiers = [
    { name: 'BRONZE', threshold: 0, benefits: ['Basic member'] },
    { name: 'SILVER', threshold: 2000, benefits: ['2x weekend pts', '5% off'] },
    { name: 'GOLD', threshold: 5000, benefits: ['3x weekend pts', '10% off', 'Birthday gift'] },
    { name: 'PLATINUM', threshold: 10000, benefits: ['5x weekend pts', '15% off', 'Birthday gift', 'VIP access'] },
  ];

  return (
    <div className="page">
      <div className="container">
        <motion.div className="page-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Rewards</h1>
        </motion.div>

        {/* Points */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card card-elevated" style={{ padding: 24, marginBottom: 24, background: 'linear-gradient(135deg, var(--color-primary), #B80023)', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Available Points</p>
              <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} style={{ fontSize: 40, fontWeight: 900 }}>{customer.points.toLocaleString()}</motion.p>
            </div>
            <div style={{ width: 56, height: 56, background: 'rgba(255,215,0,0.2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={28} color="#FFD700" fill="#FFD700" />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.7, marginBottom: 6 }}>
              <span>Silver</span><span>Gold (5,000)</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ delay: 0.3, duration: 0.8 }} style={{ height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA500)', borderRadius: 99 }} />
            </div>
          </div>
        </motion.div>

        {/* Stamp Cards */}
        <div className="section">
          <div className="section-title"><span>🎫 Stamp Cards</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <StampCard name="Bucket Meal Card" totalSlots={10} filledSlots={6} isCompleted={false} />
            <StampCard name="Zinger Collection" totalSlots={5} filledSlots={5} isCompleted={true} />
          </div>
        </div>

        {/* Tier Benefits */}
        <div className="section">
          <div className="section-title"><span>🏆 Tier Benefits</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                style={{ padding: 16, border: customer.tier === tier.name ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <TierBadge tier={tier.name} size="sm" />
                  <span className="text-xs text-muted">{tier.threshold > 0 ? `${tier.threshold.toLocaleString()} pts` : 'Start'}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {tier.benefits.map(b => (
                    <span key={b} style={{ fontSize: 11, background: 'var(--color-surface-hover)', padding: '3px 8px', borderRadius: 6 }}>{b}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
