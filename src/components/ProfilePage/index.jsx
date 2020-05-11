import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar, Progress } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { getLevel, getRank, getDefaultProfile } from '../../utils';
import { fetchUserByID } from '../../actions/userActions';

import './style.less';

const ProfilePage = (props) => {
  const { user } = props;

  const params = useParams();
  const [stateUser, setUser] = useState('');
  useEffect(() => {
    if (params.uuid) {
      fetchUserByID(params.uuid).then((res) => {
        setUser({ profile: { ...res.user }, image: res.user.profilePicture });
      });
    } else {
      setUser(user);
    }
  }, [params.uuid, user]);

  return (
    <div className="Profile-Page">
      <h1 className="title">Profile</h1>

      {stateUser && stateUser.profile && (
        <div>
          <div className="avatar-flex">
            <h2 className="name">
              {stateUser.profile.firstName} {stateUser.profile.lastName}
            </h2>
            <Avatar
              size={115}
              icon="user"
              className="avatar"
              src={stateUser.profile.profilePicture || getDefaultProfile()}
            />
          </div>
          <div className="level-info">
            <p className="rank">{getRank(stateUser.profile.points)}</p>
            <Progress
              successPercent={stateUser.profile.points % 100}
              percent={100}
              showInfo={false}
              strokeWidth={12}
              strokeColor="#587291"
            />
            <p className="level-stats">
              <span> LVL {getLevel(stateUser.profile.points)}</span>
              <span className="experience">
                {' '}
                {stateUser.profile.points % 100} / 100{' '}
              </span>
            </p>
          </div>
          <div className="meta-data">
            <p>Graduation Year: {stateUser.profile.graduationYear}</p>
            <p>Major: {stateUser.profile.major}</p>
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

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfilePage;
