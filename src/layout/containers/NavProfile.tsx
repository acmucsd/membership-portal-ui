import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, fetchUser } from '../../auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import NavProfile from '../components/NavProfile';

interface NavProfileContainerProps {
  menu: any;
}

const NavProfileContainer: React.FC<NavProfileContainerProps> = ({ menu }) => {
  const {
    profile: { points, profilePicture, firstName },
    authenticated,
  } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (authenticated) {
    return <NavProfile exp={points} profilePicture={profilePicture} name={firstName} menu={menu} />;
  }

  return null;
};

export default NavProfileContainer;
