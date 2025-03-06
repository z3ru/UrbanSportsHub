import { useState, useEffect } from 'react';
import ProfileContext from './ProfileContext';

const ProfileProvider = ({ children }) => {
  const [memberProfilePicture, setMemberProfilePicture] = useState(
    () => localStorage.getItem('memberProfilePicture') ?? ''
  );
  const [memberName, setMemberName] = useState(
    () => localStorage.getItem('memberName') ?? ''
  );
  const [memberId, setMemberId] = useState(
    () => localStorage.getItem('memberId') ?? ''
  );

  useEffect(() => {
    localStorage.setItem('memberProfilePicture', memberProfilePicture);
    localStorage.setItem('memberName', memberName);
    localStorage.setItem('memberId', memberId);
  }, [memberProfilePicture, memberName, memberId]);

  const handleSave = (newName, newId, newProfilePicture) => {
    setMemberProfilePicture(newProfilePicture);
    setMemberName(newName);
    setMemberId(newId);
  };

  const deleteImage = () => {
    setMemberProfilePicture('');
    localStorage.removeItem('memberProfilePicture');
  };

  return (
    <ProfileContext.Provider
      value={{
        memberProfilePicture,
        memberName,
        memberId,
        handleSave,
        deleteImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
