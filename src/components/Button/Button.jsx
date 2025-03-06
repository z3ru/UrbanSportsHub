import './Button.css';

const Button = ({ onClick, children, buttonType = '', type = 'button' }) => {
  return (
    <button
      className={`button ${buttonType ? `button--${buttonType}` : ''}`.trim()}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
