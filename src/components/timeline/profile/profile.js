import React from 'react';
import ProfileButtons from './profileButtons';
import ProfileCheckbox from './profileCheckbox';
import ProfileInfo from './profileInfo';

const Profile = () => {
  return (
    <div className="contnt_1">
      <ProfileCheckbox />
      <ProfileInfo />
      <ProfileButtons />
    </div>
  );
};

export default Profile;
