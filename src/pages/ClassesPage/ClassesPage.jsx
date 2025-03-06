import './ClassesPage.css';
import { useState, useEffect, useContext } from 'react';
import Class from '../../components/Class/Class';
import CheckInContext from '../../context/CheckInContext';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const { checkInObject, checkInTime, handleCheckInObject } =
    useContext(CheckInContext);

  // Todo: Move this code to a custom hook
  useEffect(() => {
    fetch('/data/classes.json')
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error('Error loading classes:', error));
  }, []);

  const handleSelectClass = (selectedClass) => {
    handleCheckInObject(selectedClass);
  };

  return (
    <div className="classes__page">
      <div className="classes__list">
        {classes.map((cls) => (
          <Class
            key={cls.id}
            classTime={cls.time}
            classCourse={cls.course}
            classLocation={cls.location}
            buttonText={'Select'}
            buttonType={checkInObject?.id === cls.id ? 'disabled' : ''}
            isSelected={checkInObject?.id === cls.id}
            classStatus={checkInObject?.id === cls.id && checkInTime}
            onSelect={() => handleSelectClass(cls)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
