import { NavLink } from 'react-router-dom';
import { Home, Ticket, Gift, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav" id="bottom-navigation">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        <Home size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/coupons" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Ticket size={22} />
        <span>Coupons</span>
      </NavLink>
      <NavLink to="/rewards" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Gift size={22} />
        <span>Rewards</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
