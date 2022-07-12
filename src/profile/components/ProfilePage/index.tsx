import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Progress } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { fetchUserByID } from '../../../auth/utils';
import { ProfileParams, PublicProfile } from '../../../types';
import { getDefaultProfile, getLevel, getRank, isWhitespace } from '../../../utils';
import './style.less';
import { AppContext } from '../../../context';

const ProfilePage: React.FC = () => {
  const { uuid } = useParams<ProfileParams>();
  const { user } = useContext(AppContext);
  const [profile, setProfile] = useState<Omit<PublicProfile, 'uuid'>>();

  useEffect(() => {
    if (uuid) {
      fetchUserByID(uuid).then(setProfile);
    } else {
      setProfile(user);
    }
  }, [user, uuid]);

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
          <div className="meta-data">
            <p>Graduation Year: {profile.graduationYear}</p>
            <p>Major: {profile.major}</p>
          </div>
          <div className="meta-data bio">
            <h2 className="bio">Bio</h2>
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
