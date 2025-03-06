import { useRef } from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { LuCamera } from 'react-icons/lu';
import './UploadProfilePicture.css';

const UploadProfilePicture = ({ uploaderImage, handleImageUpload, error }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="uploader__wrapper">
        <div className="uploader__picture">
          <ProfilePicture uploaderImage={uploaderImage} />

          <button
            className="uploader__button"
            onClick={handleUploadClick}
            title="Upload profile image"
            aria-label="Upload profile image"
          >
            <LuCamera />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {error && <p className="uploader__error-message">{error}</p>}
    </>
  );
};

export default UploadProfilePicture;
