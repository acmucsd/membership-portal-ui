import React from 'react';
import { ReactComponent as ACMIcon } from '../../../assets/icons/acm-icon.svg';
import { ReactComponent as AdminIcon } from '../../../assets/icons/admin-icon.svg';
import { ReactComponent as DashboardIcon } from '../../../assets/icons/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../../assets/icons/discord-icon.svg';
import { ReactComponent as FeedbackIcon } from '../../../assets/icons/feedback-icon.svg';
import { ReactComponent as LBIcon } from '../../../assets/icons/lb-icon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/icons/logout-icon.svg';
import { ReactComponent as OrdersIcon } from '../../../assets/icons/orders-icon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile-icon.svg';
import { ReactComponent as SwagIcon } from '../../../assets/icons/swag-icon.svg';
import { logoutUser } from '../../../auth/utils';
import NavBarItem from '../NavBarItem';
import './style.less';

interface NavbarVerticalProps {
  hasAdminAccess: boolean;
  hasStoreAdminAccess: boolean;
}

const NavbarVertical: React.FC<NavbarVerticalProps> = (props) => {
  const { hasAdminAccess, hasStoreAdminAccess } = props;

  return (
    <div className="navbar-vertical">
      <div className="navbar-vertical-padding" />
      <div className="navbar-vertical-container">
        <nav className="navbar-vertical-content">
          <div>
            <div className="navbar-vertical-group">
              <h1 className="navbar-vertical-title">Portal</h1>
              <div className="navbar-vertical-items">
                <NavBarItem icon={DashboardIcon} text="Dashboard" innerDest="/" />
                <NavBarItem icon={LBIcon} text="Leaderboard" innerDest="/leaderboard" />
                <NavBarItem icon={ProfileIcon} text="Profile" innerDest="/profile" />
                <NavBarItem icon={ACMIcon} text="Explore ACM" innerDest="/about" />
                <NavBarItem icon={DiscordIcon} text="Discord" innerDest="/discord" last={!hasAdminAccess} />
                {hasAdminAccess && <NavBarItem icon={AdminIcon} text="Admin" innerDest="/admin" last />}
              </div>
            </div>
            <div className="navbar-vertical-group">
              <h1 className="navbar-vertical-title">Store</h1>
              <div className="navbar-vertical-items">
                <NavBarItem icon={SwagIcon} text="Shop" innerDest="/store" />
                <NavBarItem icon={OrdersIcon} text="Orders" innerDest="/store/orders" last={!hasStoreAdminAccess} />
                {hasStoreAdminAccess && <NavBarItem icon={AdminIcon} text="Admin" innerDest="/store/admin" last />}
              </div>
            </div>
          </div>
          <div className="navbar-vertical-group">
            <div className="navbar-vertical-items">
              <NavBarItem icon={FeedbackIcon} text="Feedback" outerDest="https://www.acmurl.com/portal-feedback" />
              <NavBarItem icon={LogoutIcon} text="Sign Out" func={() => logoutUser()} last />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarVertical;
