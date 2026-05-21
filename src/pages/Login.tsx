import { motion } from 'framer-motion';
import { useLiff } from '../contexts/LiffContext';

const Login = () => {
  const { login, error } = useLiff();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E4002B 0%, #B80023 50%, #8B0019 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-10%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 1 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          style={{
            width: 100,
            height: 100,
            background: 'white',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: '48px' }}>🍗</span>
        </motion.div>

        <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Coupon & Loyalty
        </h1>
        <p style={{ fontSize: '15px', opacity: 0.85, marginBottom: 48, lineHeight: 1.5 }}>
          Collect points, earn rewards, and enjoy exclusive offers with every visit!
        </p>

        <motion.button
          className="btn btn-lg btn-full"
          onClick={login}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: '#06C755',
            color: 'white',
            fontSize: '16px',
            padding: '16px 32px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(6, 199, 85, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          Login with LINE
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 16,
              fontSize: '13px',
              opacity: 0.8,
              background: 'rgba(255,255,255,0.15)',
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            {error}
          </motion.p>
        )}

        <p style={{ fontSize: '12px', opacity: 0.5, marginTop: 24 }}>
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
