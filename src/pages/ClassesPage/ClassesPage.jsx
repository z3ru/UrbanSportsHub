import './ClassesPage.css';
import { useState, useEffect, useContext } from 'react';
import Class from '../../components/Class/Class';
import AddClassForm from '../../components/AddClassForm/AddClassForm';
import CheckInContext from '../../context/CheckInContext';
import { generateClassId } from '../../utils/generateClassId';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const { checkInObject, checkInTime, handleCheckInObject } =
    useContext(CheckInContext);

  // Load classes from localStorage or fallback to bundled JSON
  useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    } else {
      fetch('/data/classes.json')
        .then((response) => response.json())
        .then((data) => {
          setClasses(data);
          localStorage.setItem('classes', JSON.stringify(data));
        })
        .catch((error) => console.error('Error loading classes:', error));
    }
  }, []);

  // Persist classes to localStorage when they change
  useEffect(() => {
    if (classes.length) {
      localStorage.setItem('classes', JSON.stringify(classes));
    }
  }, [classes]);

const handleSelectClass = (selectedClass) => {
  handleCheckInObject(selectedClass);
};

  const handleAddClass = ({ course, location, time }) => {
    const newClass = {
      id: generateClassId(),
      course,
      location,
      time,
    };
    setClasses([...classes, newClass]);
  };

  return (
    <div className="classes__page">
      <AddClassForm onAdd={handleAddClass} />
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
