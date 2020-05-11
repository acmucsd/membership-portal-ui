import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar, Progress } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { getLevel, getRank, getDefaultProfile } from '../../utils';
import { fetchUserByID } from '../../actions/userActions';

import './style.less';

const ProfilePage = (props) => {
  const params = useParams();
  const [user, setUser] = useState('');
  useEffect(() => {
    if (params.uuid) {
      fetchUserByID(params.uuid).then((res) => {
        setUser({ profile: { ...res.user }, image: res.user.profilePicture });
      });
    } else {
      setUser(props.user);
    }
  }, [params.uuid, props.user]);
  return (
    <div className="Profile-Page">
      <h1 className="title">Profile</h1>

      {user && user.profile && (
        <div>
          <div className="avatar-flex">
            <h2 className="name">
              {user.profile.firstName} {user.profile.lastName}
            </h2>
            <Avatar
              size={115}
              icon="user"
              className="avatar"
              src={user.profile.profilePicture || getDefaultProfile()}
            />
          </div>
          <div className="level-info">
            <p className="rank">{getRank(user.profile.points)}</p>
            <Progress
              successPercent={user.profile.points % 100}
              percent={100}
              showInfo={false}
              strokeWidth={12}
              strokeColor="#587291"
            />
            <p className="level-stats">
              <span> LVL {getLevel(user.profile.points)}</span>
              <span className="experience">
                {' '}
                {user.profile.points % 100} / 100{' '}
              </span>
            </p>
          </div>
          <div className="meta-data">
            <p>Graduation Year: {user.profile.graduationYear}</p>
            <p>Major: {user.profile.major}</p>
          </div>
          {!params.uuid && (
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
