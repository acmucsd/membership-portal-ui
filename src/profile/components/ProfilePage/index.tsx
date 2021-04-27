import React, { useEffect, useState } from 'react';
import { Button, Avatar, Progress } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { getLevel, getRank, getDefaultProfile } from '../../../utils';
import { fetchUserByID } from '../../../auth/authActions';

import './style.less';

interface ProfilePageProps {
  user: {
    uuid: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const { user } = props;

  const params: { [key: string]: any } = useParams();
  const [stateUser, setUser] = useState<{ [key: string]: any }>();
  useEffect(() => {
    if (params.uuid) {
      fetchUserByID(params.uuid).then((res) => {
        setUser({
          profile: { ...(res as { [key: string]: any }).user },
          image: (res as { [key: string]: any }).user.profilePicture,
        });
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
            <Avatar size={115} icon="user" className="avatar" src={stateUser.profile.profilePicture || getDefaultProfile()} />
          </div>
          <div className="level-info">
            <p className="rank">{getRank(stateUser.profile.points)}</p>
            <Progress successPercent={stateUser.profile.points % 100} percent={100} showInfo={false} strokeWidth={12} strokeColor="#587291" />
            <p className="level-stats">
              <span> LVL {getLevel(stateUser.profile.points)}</span>
              <span className="experience"> {stateUser.profile.points % 100} / 100 </span>
            </p>
          </div>
          <div className="meta-data">
            <p>Graduation Year: {stateUser.profile.graduationYear}</p>
            <p>Major: {stateUser.profile.major}</p>
          </div>
          <div className="meta-data bio">
            <h2>Bio</h2>

            {(!/^[\r\n\s]*$/.test(stateUser.profile.bio as string)
              && (stateUser.profile.bio as string)?.split('\n').map((item, key) => (
                item
                  ? <p key={key}>{item}</p>
                  : <br />
              ))) || <p>This user hasn't added a bio yet!</p>
            }
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
