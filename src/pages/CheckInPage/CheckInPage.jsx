import { useState, useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import Map from '../../components/Map/Map';
import Button from '../../components/Button/Button';
import Class from '../../components/Class/Class';
import CheckInContext from '../../context/CheckInContext';
import { BiQrScan } from 'react-icons/bi';
import './CheckInPage.css';

const CheckInPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { checkInObject, checkInTime } = useContext(CheckInContext);

  return (
    <>
      <h1 className="check-in__headline">Check-in</h1>

      {isModalOpen && <Modal onClose={handleCloseModal} />}

      <div className="check-in__wrapper">
        <Button buttonType="icon">
          <BiQrScan />
        </Button>

        {checkInObject ? (
          <Class
            key={checkInObject.id}
            classTime={checkInObject.time}
            classCourse={checkInObject.course}
            classLocation={checkInObject.location}
            buttonText={checkInTime ? 'View' : 'Check in'}
            buttonType={checkInTime ? '' : 'primary'}
            classStatus={checkInTime}
            onSelect={handleOpenModal}
          />
        ) : (
          ''
        )}
      </div>
      <Map />
    </>
  );
};

export default CheckInPage;
