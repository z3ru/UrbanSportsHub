import { useState } from 'react';
import Button from '../Button/Button';
import './AddClassForm.css';

const AddClassForm = ({ onAdd }) => {
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!course || !location || !time) return;
    onAdd({ course, location, time });
    setCourse('');
    setLocation('');
    setTime('');
  };

  return (
    <form className="add-class-form" onSubmit={handleSubmit}>
      <div className="form__input-group">
        <label htmlFor="course">Course</label>
        <input
          id="course"
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="text"
          placeholder="10:00"
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
