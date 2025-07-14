import { useState } from 'react';
import Button from '../Button/Button';
import './AddClassForm.css';

const AddClassForm = ({ onAddClass }) => {
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course || !location || !time) return;

    onAddClass({ course, location, time });
    setCourse('');
    setLocation('');
    setTime('');
  };

  return (
    <form className="add-class-form" onSubmit={handleSubmit}>
      <div className="add-class__group">
        <label htmlFor="course">Class Name:</label>
        <input
          id="course"
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </div>
      <div className="add-class__group">
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="add-class__group">
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <Button type="submit" buttonType="primary">
        Add Class
      </Button>
    </form>
  );
};

export default AddClassForm;
