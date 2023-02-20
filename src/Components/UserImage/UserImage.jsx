import React from 'react';
import { useUser } from '../../Contexts/user-context';
import './UserImage.scss';

const UserImage = () => {
  const { user } = useUser();

  return (
    <div className='userImage'>
      {
        user && <img src={user.imageUrl} alt='Profile Picture' className='userImage__profile-picture' />
      }
    </div>
  );
};

export default UserImage;