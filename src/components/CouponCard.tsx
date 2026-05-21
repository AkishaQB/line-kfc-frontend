import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

interface CouponCardProps {
  id: string;
  title: string;
  description?: string;
  type: string;
  discountType?: string;
  discountValue?: number;
  expiresAt: string;
  code: string;
  index?: number;
}

const typeColors: Record<string, string> = {
  PERCENTAGE: '#E4002B',
  FIXED: '#3B82F6',
  FREE_ITEM: '#10B981',
  BOGO: '#8B5CF6',
  LOYALTY_REWARD: '#FFD700',
};

const CouponCard = ({
  id,
  title,
  description,
  type,
  discountType,
  discountValue,
  expiresAt,
  code,
  index = 0,
}: CouponCardProps) => {
  const navigate = useNavigate();
  const accentColor = typeColors[type] || '#E4002B';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  const formatDiscount = () => {
    if (type === 'FREE_ITEM') return 'FREE';
    if (type === 'BOGO') return 'B1G1';
    if (type === 'LOYALTY_REWARD') return '🎁';
    if (discountType === 'PERCENTAGE') return `${discountValue}%`;
    if (discountType === 'FIXED_AMOUNT') return `฿${discountValue}`;
    return '';
  };

  return (
    <motion.div
      className="coupon-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/coupons/${id}`)}
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="coupon-card-top">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 4 }}>{title}</h4>
            {description && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                {description}
              </p>
            )}
          </div>
          <div className="coupon-discount" style={{ color: accentColor }}>
            {formatDiscount()}
            {discountType === 'PERCENTAGE' && <span> OFF</span>}
          </div>
        </div>
      </div>

      <div className="coupon-card-divider" />

      <div className="coupon-card-bottom">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={14} color="var(--color-text-muted)" />
          <span
            style={{
              fontSize: '12px',
              color: daysLeft <= 3 ? 'var(--color-error)' : 'var(--color-text-muted)',
              fontWeight: daysLeft <= 3 ? 600 : 400,
            }}
          >
            {daysLeft === 0 ? 'Expires today!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
            {code}
          </span>
          <ChevronRight size={16} color="var(--color-text-muted)" />
        </div>
      </div>
    </motion.div>
  );
};

export default CouponCard;
