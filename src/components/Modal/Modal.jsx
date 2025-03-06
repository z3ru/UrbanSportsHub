import { useContext, useState, useEffect } from 'react';
import ProfileContext from '../../context/ProfileContext';
import CheckInContext from '../../context/CheckInContext';
import ModalProfilePicture from '../ModalProfilePicture/ModalProfilePicture';
import { formatDateAndTime, formatTimer } from '../../utils/timeUtils';
import { IoShareSocialOutline } from 'react-icons/io5';
import { RiTimeLine, RiCloseFill } from 'react-icons/ri';

import './Modal.css';

const Modal = ({ onClose }) => {
  const { memberName, memberId } = useContext(ProfileContext);
  const { checkInTime, checkInObject, setAndStoreCheckInTime } =
    useContext(CheckInContext);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // The check-in time is set when the modal is opened for the first time
  useEffect(() => {
    if (!checkInTime) {
      setAndStoreCheckInTime();
    }
  }, [checkInTime, setAndStoreCheckInTime]);

  // Timer logic
  useEffect(() => {
    if (!checkInTime) return;

    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((new Date() - checkInTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [checkInTime]);

  return (
    <div className="modal__background">
      <div className="modal__content">
        <button
          className="modal__icon modal__icon--close"
          aria-label="Close check-in"
          onClick={onClose}
        >
          <RiCloseFill />
        </button>
        <div
          className="modal__icon modal__icon--share"
          aria-label="Share check-in"
        >
          <IoShareSocialOutline />
        </div>

        <ModalProfilePicture />

        <section className="modal__details">
          <p className="modal__message">Check-in successful</p>
          <p className="modal__name">{memberName}</p>
          <p className="modal__id">{memberId}</p>
          <p className="modal__course">{checkInObject.course}</p>
          <p className="modal__location">{checkInObject.location}</p>
        </section>
        <div className="modal__date-and-time">
          <div>
            <div className="modal__date-label">Checked-in at</div>
            <time>{checkInTime && formatDateAndTime(checkInTime)}</time>
          </div>
          <div className="modal__timer">
            <RiTimeLine size={20} />
            <span>{formatTimer(timeElapsed)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
