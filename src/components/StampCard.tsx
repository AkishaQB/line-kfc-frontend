import { motion } from 'framer-motion';
import { Star, Award } from 'lucide-react';

interface StampCardProps {
  name: string;
  totalSlots: number;
  filledSlots: number;
  isCompleted: boolean;
}

const StampCard = ({ name, totalSlots, filledSlots, isCompleted }: StampCardProps) => {
  const slots = Array.from({ length: totalSlots }, (_, i) => i);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: isCompleted
          ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
          : 'var(--color-surface)',
      }}
    >
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: isCompleted ? 'white' : 'var(--color-text)' }}>
            {name}
          </h4>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isCompleted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)',
            }}
          >
            {filledSlots}/{totalSlots}
          </span>
        </div>

        <div className="stamp-grid">
          {slots.map((i) => {
            const isFilled = i < filledSlots;
            const isReward = i === totalSlots - 1;

            return (
              <motion.div
                key={i}
                className={`stamp-slot ${isFilled ? 'filled' : ''} ${isReward && !isFilled ? 'reward' : ''}`}
                initial={isFilled ? { scale: 0 } : {}}
                animate={isFilled ? { scale: 1 } : {}}
                transition={{ delay: i * 0.05, type: 'spring' }}
              >
                {isFilled ? (
                  <Star size={18} fill="white" />
                ) : isReward ? (
                  <Award size={18} />
                ) : (
                  <span style={{ color: 'var(--color-border)', fontSize: '14px' }}>{i + 1}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 12,
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            🎉 Card Complete! Reward unlocked!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StampCard;
