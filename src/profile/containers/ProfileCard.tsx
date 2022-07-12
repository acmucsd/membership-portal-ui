import React, { useContext, useEffect } from 'react';
import { fetchUser } from '../../auth/utils';
import { AppContext } from '../../context';
import { getLevel, getRank } from '../../utils';
import ProfileCard from '../components/ProfileCard';

const NavProfileContainer: React.FC = () => {
  const { user, setUser } = useContext(AppContext);

  const { profilePicture, firstName, points } = user;

  useEffect(() => {
    fetchUser().then(setUser);
  }, [setUser]);

  return <ProfileCard exp={points} profilePicture={profilePicture} level={getLevel(points)} name={firstName} rank={getRank(points)} />;
};

export default NavProfileContainer;
