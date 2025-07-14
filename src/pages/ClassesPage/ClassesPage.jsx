import './ClassesPage.css';
import { useState, useEffect, useContext } from 'react';
import Class from '../../components/Class/Class';
import AddClassForm from '../../components/AddClassForm/AddClassForm';
import CheckInContext from '../../context/CheckInContext';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const { checkInObject, checkInTime, handleCheckInObject } =
    useContext(CheckInContext);

  // Load classes from localStorage or fallback to static json
  useEffect(() => {
    const stored = localStorage.getItem('classes');
    if (stored) {
      setClasses(JSON.parse(stored));
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

  // Persist classes to localStorage
  useEffect(() => {
    if (classes.length) {
      localStorage.setItem('classes', JSON.stringify(classes));
    }
  }, [classes]);

  const handleAddClass = (newClass) => {
    const newId = classes.length
      ? Math.max(...classes.map((c) => c.id)) + 1
      : 1;
    setClasses([...classes, { id: newId, ...newClass }]);
  };

  const handleSelectClass = (selectedClass) => {
    handleCheckInObject(selectedClass);
  };

  return (
    <div className="classes__page">
      <h1 className="classes-headline">Classes</h1>
      <AddClassForm onAddClass={handleAddClass} />
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
