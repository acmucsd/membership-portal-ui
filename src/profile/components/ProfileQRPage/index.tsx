import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Progress } from 'antd';
import QRCode from 'react-qr-code';
import { useAppDispatch } from '../../../redux/store';
import { getDefaultProfile, getLevel, getRank } from '../../../utils';
import { ProfileParams, PublicProfileWithEmail } from '../../../types';
import { authSelector, fetchUserByID } from '../../../auth/authSlice';

import BreadcrumbArrow from '../../../assets/icons/breadcrumb-arrow.svg';

import './style.less';

const ProfileQRPage: React.FC = () => {
  const { uuid } = useParams<ProfileParams>();
  const [profile, setProfile] = useState<Omit<PublicProfileWithEmail, 'uuid'>>();
  const auth = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      dispatch(fetchUserByID(uuid))
        .unwrap()
        .then(({ user }) => {
          setProfile(user);
        });
    } else {
      setProfile(auth.profile);
    }
  }, [auth.profile, dispatch, uuid]);

  return (
    <div className="profile-qr-page">
      <Link to="/">
        <div className="breadcrumb">
          <img className="breadcrumb-arrow" src={BreadcrumbArrow} alt="Breadcrumb Arrow" />
          <span className="breadcrumb-text">Back to Dashboard</span>
        </div>
      </Link>

      {profile && (
        <div className="qr-card">
          <div className="qr-container">
            <QRCode width={300} value={profile.email} />
          </div>
          <div className="avatar-flex">
            <Avatar size={115} icon="user" className="avatar" src={profile.profilePicture || getDefaultProfile()} />
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
          </div>
          <div className="level-info">
            <p className="rank">{getRank(profile.points)}</p>
            <Progress
              successPercent={profile.points % 100}
              percent={100}
              showInfo={false}
              strokeWidth={12}
              strokeColor="var(--theme-accent-line-2)"
            />
            <p className="level-stats">
              <span> LVL {getLevel(profile.points)}</span>
              <span className="experience"> {profile.points % 100} / 100 </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileQRPage;
