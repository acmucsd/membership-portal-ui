import React, { useEffect, useState } from 'react';
import { Avatar, Button, Progress } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { authSelector, fetchUserByID } from '../../../auth/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { ProfileParams, PublicProfile } from '../../../types';
import { getDefaultProfile, getLevel, getRank, isWhitespace } from '../../../utils';
import './style.less';

const ProfilePage: React.FC = () => {
  const { uuid } = useParams<ProfileParams>();
  const [profile, setProfile] = useState<Omit<PublicProfile, 'uuid'>>();
  const auth = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uuid) {
      dispatch(fetchUserByID(uuid))
        .unwrap()
        .then(({ user }) => setProfile(user));
    } else {
      setProfile(auth.profile);
    }
  }, [auth.profile, dispatch, uuid]);

  return (
    <div className="Profile-Page">
      <h1 className="title">Profile</h1>
      {profile && (
        <div>
          <div className="avatar-flex">
            <h2 className="name">
              {profile.firstName} {profile.lastName}
            </h2>
            <Avatar size={115} icon="user" className="avatar" src={profile.profilePicture || getDefaultProfile()} />
          </div>
          <div className="level-info">
            <p className="rank">{getRank(profile.points)}</p>
            <Progress successPercent={profile.points % 100} percent={100} showInfo={false} strokeWidth={12} strokeColor="#587291" />
            <p className="level-stats">
              <span> LVL {getLevel(profile.points)}</span>
              <span className="experience"> {profile.points % 100} / 100 </span>
            </p>
          </div>
          <div className="meta-data">
            <p>Graduation Year: {profile.graduationYear}</p>
            <p>Major: {profile.major}</p>
          </div>
          <div className="meta-data bio">
            <h2>Bio</h2>
            <p>{isWhitespace(profile.bio) ? "This user hasn't added a bio yet!" : profile.bio}</p>
          </div>
          {!uuid && (
            <Link to="/editProfile">
              <Button className="edit-profile-btn">Edit Profile</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
