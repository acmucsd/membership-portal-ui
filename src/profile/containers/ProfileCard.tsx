import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, fetchUser } from '../../auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { getLevel, getRank } from '../../utils';
import ProfileCard from '../components/ProfileCard';

const NavProfileContainer: React.FC = () => {
  const {
    profile: { profilePicture, firstName, points },
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <ProfileCard exp={points} profilePicture={profilePicture} level={getLevel(points)} name={firstName} rank={getRank(points)} />;
};

export default NavProfileContainer;
