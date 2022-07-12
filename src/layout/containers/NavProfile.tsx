import React, { useContext, useEffect } from 'react';
import { fetchUser } from '../../auth/utils';
import { AppContext } from '../../context';
import NavProfile from '../components/NavProfile';

interface NavProfileContainerProps {
  menu: any;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = ({ menu }) => {
  const {
    authenticated,
    user: { firstName, points, profilePicture },
  } = useContext(AppContext);

  useEffect(() => {
    fetchUser();
  }, []);

  if (authenticated) {
    return <NavProfile exp={points} profilePicture={profilePicture} name={firstName} menu={menu} />;
  }

  return null;
};

export default NavProfileContainer;
