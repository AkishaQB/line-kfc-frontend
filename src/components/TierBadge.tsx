import { motion } from 'framer-motion';

interface TierBadgeProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
}

const tierConfig: Record<string, { label: string; gradient: string; textColor: string; icon: string }> = {
  BRONZE: {
    label: 'Bronze',
    gradient: 'linear-gradient(135deg, #CD7F32, #A0622E)',
    textColor: '#FFF',
    icon: '🥉',
  },
  SILVER: {
    label: 'Silver',
    gradient: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)',
    textColor: '#333',
    icon: '🥈',
  },
  GOLD: {
    label: 'Gold',
    gradient: 'linear-gradient(135deg, #FFD700, #DAA520)',
    textColor: '#333',
    icon: '🥇',
  },
  PLATINUM: {
    label: 'Platinum',
    gradient: 'linear-gradient(135deg, #E5E4E2, #8B8B8B)',
    textColor: '#FFF',
    icon: '💎',
  },
};

const sizeStyles = {
  sm: { padding: '4px 10px', fontSize: '11px' },
  md: { padding: '6px 14px', fontSize: '13px' },
  lg: { padding: '8px 18px', fontSize: '15px' },
};

const TierBadge = ({ tier, size = 'md' }: TierBadgeProps) => {
  const config = tierConfig[tier] || tierConfig.BRONZE;
  const sizeStyle = sizeStyles[size];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: config.gradient,
        color: config.textColor,
        fontWeight: 700,
        borderRadius: '999px',
        letterSpacing: '0.02em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        ...sizeStyle,
      }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </motion.span>
  );
};

export default TierBadge;
