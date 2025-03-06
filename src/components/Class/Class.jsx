import Button from '../Button/Button';
import './Class.css';

const Class = ({
  classTime,
  classCourse,
  classLocation,
  classStatus = null,
  buttonType,
  buttonText,
  isSelected,
  onSelect,
}) => {
  return (
    <>
      <div className={`class__card ${isSelected ? 'selected' : ''}`}>
        <div className="class__time">{classTime}</div>

        <div className="class__details">
          <p className="class__course">{classCourse}</p>
          <p className="class__location">{classLocation}</p>
          <p
            className={`class__status ${
              classStatus ? 'class__status--checked-in' : ''
            }`.trim()}
          >
            {classStatus ? 'Checked in' : 'Not checked in'}
          </p>
        </div>

        <div className="class__action">
          <Button buttonType={buttonType} onClick={onSelect}>
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Class;
